<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecimiento de Contraseña</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #321d92;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .email-header img {
            max-width: 200px; 
            height: auto; 
        }
        .email-body {
            padding: 20px;
            color: #333333;
            text-align: center;
        }
        .email-body h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .email-body p {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
        }
        .token {
            display: inline-block;
            font-family: "Courier New", Courier, monospace;
            font-size: 28px;
            font-weight: bold;
            /* letter-spacing: 8px; */
            color: #321d92;
            background: #e9e7fc;
            padding: 10px 15px;
            border: 2px solid #321d92;
            border-radius: 5px;
            margin: 20px 0;
            text-decoration: none;
        }
        .email-footer {
            text-align: center;
            font-size: 14px;
            color: #888888;
            padding: 10px 20px;
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <img src="https://i.imgur.com/QaraZ7p.png" alt="Logo">
        </div>
        <div class="email-body">
            <h1>Solicitud para restablecer tu contraseña</h1>
            <p>Hola,</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Si no realizaste esta solicitud, puedes ignorar este correo.</p>
            <p>Por favor, utiliza el siguiente código para restablecer tu contraseña:</p>
            <!-- <div class="token">
                {{ $token }}
            </div> -->
            <a href="http://localhost:5173/reset-password/ {{ $token }}" class="token">
                Restablecer
            </a>
            <p>Este código solo es válido por 30 minutos.</p>
            <p>Gracias,</p>
            <p>El equipo de Soporte</p>
        </div>
        <div class="email-footer">
            &copy; SEPROAC.
        </div>
    </div>
</body>
</html>