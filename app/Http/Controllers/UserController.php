<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\AcademicGrade;
use App\Models\Congress;
use App\Models\Course;
use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Mockery\Matcher\HasKey;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Group;
use App\Models\Publication;
use App\Models\Tag;
use Illuminate\Cache\TagSet;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Str;

use function Laravel\Prompts\alert;
use function Laravel\Prompts\error;

class UserController extends Controller
{
    use ValidatesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('role:id,name')->get();

        // $this->log(__FUNCTION__, 'users', 'consultar users', Auth::id(), route(), );

        return $this->jsonResponse('Registro consultado correctamente', $users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    { 
   
        error_log(json_encode($request->all()));
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255', // The name field is required, must be a string, and a max length of 255
            'email' => 'required|string|email|max:255|unique:users,email', // Email is required, must be unique, and a valid email
            'date_ingreso' => 'nullable|date', // date_ingreso can be null, but if present, must be a valid date
            'birth_date' => 'nullable|date', // birth_date can be null, but if present, must be a valid date
            'sex' => 'nullable|in:M,F', // sex can be null, but if present, must be either 'M' or 'F'
            'password' => 'required|string|min:6', // Password is required, must be a string, and have at least 6 characters
            'role_id' => 'nullable|integer|exists:roles,id', // role_id can be null, but if present, must be a valid integer and exist in the roles table            
            'contratation_type' => 'nullable|string'
        ]);


        if($validator->fails()) return response()->json([
            'data' => $validator->errors()
        ], HttpResponse::HTTP_BAD_REQUEST);
        
        
        $request['date_ingreso'] = Carbon::parse($request->date_ingreso)->format('Y-m-d H:i:s');
        $request['birth_date'] = Carbon::parse($request->birth_date)->format('Y-m-d H:i:s');
        $user = User::create($request->all());

        $user['token'] = $user->createToken('')->plainTextToken;
        // $this->log(__FUNCTION__, 'users', 'crear users', Auth::id(), $user->id);
        if($request->hasFile('avatar')) $user->addMedia($request->avatar)->toMediaCollection('avatar');

        return $this->jsonResponse('Registro registro correctamente', $user);
    }

    /**
     * Display the specified resource.
     */
    public function get($id)
    {
        $user = User::with('role', 'tags', 'avatar')->findOrfail($id);

        // $this->log(__FUNCTION__, 'users', 'get users', Auth::id(),$user->id);

        return $this->jsonResponse('Registro consultado correctamente', $user, Response::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {  
        error_log(json_encode([$request->all(), $request->files->count()]));
        $validator = Validator::make($request->all(), [
            'date_ingreso' => 'nullable|date',
            'birth_date' => 'nullable|date',
            'sex' => 'nullable|in:M,F',
            'password' => 'sometimes|nullable|confirmed',
            'role_id' => 'nullable|exists:roles,id',
            'email' => 'required|string|email|max:255|unique:users,email,'.$request->id,
            'name' => 'required|string|max:255|unique:users,name,'.$request->id,
            'avatar' => 'sometimes|nullable|image',
            'contratation_type' => 'nullable|string'
        ]);

        if($validator->fails()) 
        {     
            return response()->json([
            'data' => $validator->errors()
        ], HttpResponse::HTTP_BAD_REQUEST);
        
        } 
        
        $user = User::findOrFail($request->id);
        
        $request['password'] = isset($request['password']) ? bcrypt($request['password']) : $user->password;
   
       if(isset($request->tags)){
            $user->tags()->sync($request->tags);
         }

        $user->update($request->all());
        if($request->hasFile('avatar')) $user->addMedia($request->avatar)->toMediaCollection('avatar');

        return $this->jsonResponse('Registro actualizado correctamente', compact('user'), Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {        
        $user = User::find($id);


        if($user && $user->id != 1){
            $user->delete();
        }

        return $this->jsonResponse('Registro eliminado correctamente', 200, Response::HTTP_OK);
    }
    public function login(Request $request)
    {

        $user = User::where('email', $request->email)->with('avatar', 'role')->first();

        if(!$user){
            return $this->jsonResponse('Registro no encontrado', []);
        }

        if(!Hash::check($request->password, $user->password)){
            return $this->jsonResponse('REgistro no encontrado', []);
        }

        $user->tokens()->delete();
        
        $user['token'] = $user->createToken('')->plainTextToken;

        $user->append('all_permissions');

        return $this->jsonResponse('Registro consultado correctamente', $user);
    }
    

    public function dashboard(){
        $user_id = Auth::id();
       
        $academic_grades = AcademicGrade::with('institution:id,name')->where('user_id', $user_id)->get();
       
        $tags = Tag::select('id', 'name')
            ->withCount([
                'congresses' => function ($query) use ($user_id) {
                    $query->where('user_id', $user_id);
                },
                'projects' => function ($query) use ($user_id) {
                    $query->where('user_id', $user_id);
                },
                'courses' => function ($query) use ($user_id) {
                    $query->where('user_id', $user_id);
                },
                'publications' => function ($query) use ($user_id) {
                    $query->where('user_id', $user_id);
                },
            ])
            ->get();

        $relationships = ['congresses', 'projects', 'courses', 'publications'];
        $auth_user = User::find($user_id)->loadCount($relationships);

        $data = [];

        foreach ($relationships as $relationship) {

            $data[$relationship] = [
                'count' => $auth_user->{$relationship.'_count'},
                'tags' => $tags->filter(function ($tag) use ($relationship) {
                    return $tag->{$relationship.'_count'} > 0; // Only include tags with at least one item in the relationship
                })->values()
            ];
        }

        $data = collect($data); 
        
        return $this->jsonResponse('Registro consultado correctamente', [
            'production' => $data,
            'academic_grades' => $academic_grades
        ]);
    }

    public function sendResetToken(Request $request) {
        
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $email = $request->email;

        $token = Str::random(6);

        //eliminar registros existentes del mismo usuario
        if (DB::table('password_resets')->where('email', $email)->exists()) {
            DB::table('password_resets')->where('email', $email)->delete();
        }

        //insertar
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now(),
        ]);

        //enviar correo
        Mail::to($email)->send(new ResetPasswordMail($token));
    
        return response()->json(['message' => 'Correo enviado correctamente', 'token' => $token], 200);
    }

    public function resetPassword(Request $request) {

        $request->validate([
            // 'email' => 'email|exists:users,email',
            'token' => 'required',
            'password' => 'required|min:8',
        ]);

        //buscar token
        $passwordReset = DB::table('password_resets')
            // ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$passwordReset) {
            return response()->json(['message' => 'Token inválido o expirado.'], 400);
        }

        //tiempo d vida, pero puede quitarse o mas/menos tiempo
        if (Carbon::parse($passwordReset->created_at)->addMinutes(30)->isPast()) {
            return response()->json(['message' => 'El token ha expirado.'], 400);
        }

        //restablece
        $user = \App\Models\User::where('email', $passwordReset->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        //elimar el token
        DB::table('password_resets')->where('email', $passwordReset->email)->delete();

        return response()->json(['message' => 'Contraseña restablecida con éxito.'], 200);
    }

}
