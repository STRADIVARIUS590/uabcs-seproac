import { ChangeEvent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Controller} from 'react-hook-form';
import { MessageToast } from '../MessageToast';
import { useUsersForm } from '@/hooks/user/useUsersForm';
   
export interface UserItem {
  id: string; 
  name: string;  
}
export interface TagItem {
  name: string;
  id: string | number;
}

export const AddEditForm = () => {
    const { id } = useParams<{ id?: string }>();
    const {avatarPreview, setAvatarPreview, handleSubmit, loadData, roles, tags, onSubmit, loading, register,errors, control , setValue} = useUsersForm({id})
    const isEditMode = !!id

    useEffect(() => {
      loadData();
    }, [id]);

 
    if (loading) return <MessageToast message="Cargando..." type="loading" />;

      return (
      <form onSubmit={handleSubmit(onSubmit)}>


        <section className="py-12 bg-gray-50 dark:bg-dark">
          <div className="container mx-auto max-w-4xl p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 px-4 mb-6">
                <label className="mb-[10px] block text-base font-medium text-dark dark:text-white" htmlFor="name">Nombre</label>
                <input
                  type="text"
                  {...register('name')}
                  id="name"
                  className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <label className="mb-[10px] block text-base font-medium text-dark dark:text" >Correo</label>
                <input
                  type="email"
                  {...register('email')}
                  id="email"
                  className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                />


                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div className="w-full md:w-1/2 px-4 mb-6">
                <label className="mb-[10px] block text-base font-medium text-dark dark:text" >Fecha de ingreso</label>
                <input
                  type="date"
                  {...register('date_ingreso')}
                  id="date_ingreso"
                  className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                />
                {errors.date_ingreso && <p className="text-red-500">{errors.date_ingreso.message}</p>}

                <label className="mb-[10px] block text-base font-medium text-dark dark:text" >Fecha de nacimiento</label>
                <input
                  type="date"
                  {...register('birth_date')}
                  id="birth_date"
                  className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                />
                {errors.birth_date && <p className="text-red-500">{errors.birth_date.message}</p>}
              </div>

              <div className="w-full md:w-1/2 px-4 mb-6">
                <label className="mb-[10px] block text-base font-medium text-dark dark:text" >Contraseña</label>
                <input
                  type="password"
                  {...register('password')}
                  id="password"
                  className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <label className="mb-[10px] block text-base font-medium text-dark dark:text" >Confirmar Contraseña</label>
                <input
                  type="password"
                  {...register('password_confirmation')}
                  id="password_confirmation"
                  className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                />
                {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation.message}</p>}
              </div>

              <div className="w-full px-4 mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Rol</label>
                <Controller
                  name="role_id"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      {roles && roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    
                  )}
                />
                  {errors.role_id && <p className="text-red-500">{errors.role_id.message}</p>}
              </div>

             
            </div>
            {avatarPreview && (
            <div className="mt-4">
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>
          )}
          {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation.message}</p>}

            {/* Etiquetas */}
            <div className="w-full px-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-white mb-2">
                Etiquetas
              </h3>
              <div className="flex flex-wrap gap-4">
                {tags.map((item) => (
                  <label key={item.id} className="flex items-center space-x-2">
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field: { value, onChange } }) => {
                        const isChecked = value?.includes(item.id);
                        return (
                          <input
                            type="checkbox"
                            value={item.id}
                            checked={isChecked}
                            onChange={(_e: ChangeEvent<HTMLInputElement>) => {
                              const newValue = isChecked
                                ? value?.filter((v: number) => v !== item.id)
                                : [...(value || []), item.id];
                              onChange(newValue);
                              // console.log(watch('tags'));
                            }}
                            className="w-4 h-4 text-primary border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-primary"
                          />
                        );
                      }}
                    />
                    <span className="text-sm text-gray-700 dark:text-white">{item.name}</span>
                  </label>
                ))}
                  {errors.avatar && <p className="text-red-500">{errors.avatar.message}</p>}

              </div>
            </div>
             <div className="mt-6 text-right">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              {isEditMode ? "Actualizar" : "Guardar"}
            </button>
          </div>
          </div>
        </section>

       
           

        {/* <input type="submit" value="Enviar solicitud" /> */}
      </form>
    );
  };
