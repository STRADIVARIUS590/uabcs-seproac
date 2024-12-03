import { useForm } from "react-hook-form";

// Define form field types
type FormFields = {
  nombre: string;
  email: string;
  pass: string;
  pass_conf: string;
  fecha_nac: string;
  pais: string;
  estado?: string;
  foto_usuario: File[]; // Expecting an array of files
  tyc: boolean;
};

export const Form = () => {
  const labelstyles = {
    display: "block",
  };

  const errorStyles = {
    display: "block",
    color: "red",
    fontSize: "small",
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onChange",
    defaultValues: {
      nombre: "joel",
      email: "joel@gmail.com",
      pass: "",
      pass_conf: "",
      fecha_nac: "",
      pais: "mexico",
      estado: "",
      foto_usuario: [], // Empty array for files
      tyc: false,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        alert("Formulario enviado");
        console.log(data);
        reset()
      })}
    >
      <label style={labelstyles} htmlFor="nombre">
        Nombre
      </label>
      <input
        {...register("nombre", {
          required: true,
          minLength: 2,
        })}
        type="text"
        id="nombre"
      />
      {errors.nombre?.type == "required" && (
        <span style={errorStyles}>{"El nombre es requerido"}</span>
      )}
      {errors.nombre?.type == "minLength" && (
        <span style={errorStyles}>{"El nombre debe tener al menos 2 chars"}</span>
      )}

      <label style={labelstyles} htmlFor="email">
        Correo
      </label>
      <input
        {...register("email", {
          required: {
            value: true,
            message: "El correo es requerido",
          },
          minLength: {
            value: 2,
            message: "El nombre debe tener al menos 2 caracteres",
          },
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Correo no válido",
          },
        })}
        type="email"
        name="email"
        id="email"
      />
      {errors.email && (
        <span style={errorStyles}>{errors?.email?.message?.toString()}</span>
      )}

      <label style={labelstyles} htmlFor="pass">
        Contraseña
      </label>
      <input
        {...register("pass", {
          required: {
            value: true,
            message: "La contraseña es requerida",
          },
        })}
        type="password"
        name="pass"
        id="pass"
      />
      {errors.pass && <span style={errorStyles}>{errors?.pass?.message?.toString()}</span>}

      <label style={labelstyles} htmlFor="pass_conf">
        Confirmar Contraseña
      </label>
      <input
        {...register("pass_conf", {
          required: {
            value: true,
            message: "La confirmación de contraseña es requerida",
          },
          validate: (value) => {
            return watch("pass") === value || "Las contraseñas no coinciden";
          },
        })}
        type="password"
        name="pass_conf"
        id="pass_conf"
      />
      {errors.pass_conf && (
        <span style={errorStyles}>{errors?.pass_conf?.message?.toString()}</span>
      )}

      <label style={labelstyles} htmlFor="fecha_nac">
        Fecha de nacimiento
      </label>
      <input
        {...register("fecha_nac", {
          required: {
            value: true,
            message: "La fecha de nacimiento es requerida",
          },
          validate: (value) => {
            const fecha_nac = new Date(value);
            const today = new Date();
            const edad = today.getFullYear() - fecha_nac.getFullYear();
            return edad >= 18 ? true : "Debes ser mayor de edad";
          },
        })}
        type="date"
        name="fecha_nac"
      />
      {errors.fecha_nac && (
        <span style={errorStyles}>{errors?.fecha_nac?.message?.toString()}</span>
      )}

      {watch("pais") === "mexico_2" && (
        <div>
          <input
            type="text"
            {...register("estado", {
              required: {
                value: true,
                message: "El estado es requerido",
              },
            })}
          />
          {errors.estado && (
            <span style={errorStyles}>{errors?.estado?.message?.toString()}</span>
          )}
        </div>
      )}

      <label style={labelstyles} htmlFor="pais">
        País
      </label>
      <select {...register("pais")} name="pais">
        <option value="mexico">México</option>
        <option value="mexico_2">México 2</option>
        <option value="mexico_3">México 3</option>
        <option value="mexico_4">México 4</option>
      </select>

      <label style={labelstyles} htmlFor="file">
        Foto
      </label>
      <input
        onChange={(e) => {
          const files = e.target.files;
          setValue("foto_usuario", files ? Array.from(files) : [], {
            shouldValidate: true,
          });
        }}
        multiple
        type="file"
      />

      <label style={labelstyles} htmlFor="tyc">
        Términos y condiciones
      </label>
      <input
        {...register("tyc", {
          required: true,
        })}
        type="checkbox"
        id="tyc"
      />
      {errors.tyc && (
        <span style={errorStyles}>{"Debes aceptar los términos y condiciones"}</span>
      )}

      <br />
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
      <button type="submit">Enviar</button>
    </form>
  );
};
