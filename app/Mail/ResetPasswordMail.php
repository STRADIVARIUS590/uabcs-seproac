<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public $token;

    /**
     * Crear una nueva instancia de mensaje.
     *
     * @param string $token
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Construir el mensaje.
     *
     * @return $this
     */
    // public function build()
    // {
    //     return $this->view('emails.reset_password') 
    //                 ->with([
    //                     'token' => $this->token,  //se manda el token a la vista
    //                 ])
    //                 ->subject('Restablecimiento de contraseña');
    // }
    public function build() {
        
    $frontendUrl = config('app.frontend_url', env('FRONTEND_URL', 'http://localhost:5173'));
    $resetUrl = "{$frontendUrl}/reset-password/{$this->token}";

    return $this->view('emails.reset_password')
                ->with([
                    'resetUrl' => $resetUrl,  //se manda el token a la vista
                ])
                ->subject('Restablecimiento de contraseña');
    }
}
