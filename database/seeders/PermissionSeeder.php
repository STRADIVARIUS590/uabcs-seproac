<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Context;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Exceptions\RoleDoesNotExist;
use Spatie\Permission\Models\Role;

use function Laravel\Prompts\error;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $permissions = [
            [
                'name' => 'users.add',
                'roles' => [
                    'Sistemas',
                    'Admin'
                ],
                'name' => 'users.get',
                'roles' => [
                    'Sistemas',
                    'Admin'
                ]
            ],
            [
                'name' => 'users.destroy',
                'roles' => [
                    'Sistemas'
                ]
            ]
        ];
        $role_sistemas = Role::create(['name' => 'Sistemas', 
        // 'guard_name'=> 'api'
        ]);
        $role_admin = Role::create(['name' => 'Admin',
        //  'guard_name' => 'api'
        ]);

        foreach($permissions as $permission){
            $p = Permission::create([
                'name' => $permission['name'],
                // 'guard_name' => 'api'
            ]);

            foreach($permission['roles'] as $role){
                $p->assignRole($role);
            }
        }

        foreach(User::get() as $user){
            $user->assignRole($user->role_id);
        }
    

    }
}
