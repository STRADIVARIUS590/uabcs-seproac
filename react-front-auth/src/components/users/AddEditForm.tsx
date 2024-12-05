import { UserItem_T } from '@/hooks/user/useUserColumns';
import { useUser } from '@/hooks/user/useUserData';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { MessageToast } from '../MessageToast';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Api } from '@/services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useUsersForm } from '@/hooks/user/useUsersForm';
import { useRoles } from '@/hooks/roles/useRolesData';
import { RoleItem_T } from '@/hooks/roles/useRolesTableColumns';
import { TagItem } from '@/hooks/tags/useTagsColumns';
import { useTags } from '@/hooks/tags/useTagsData';

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  email: Yup.string().email('Direccion de correo inválida').required('El correo es requerido'),
  password: Yup.string()
    .min(5, 'La contraseña debe tener mínimo 5 caracteres')
    .required('La contraseña es requerida'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('La confirmación de contraseña es requerida'),
  date_ingreso: Yup.string().required('La fecha de inicio es requerida'),
  birth_date: Yup.string().required('La fecha de inicio es requerida'),
  role_id: Yup.string().required('El rol es requerida'),
  tags: Yup.array().optional(),
  avatar : Yup.mixed()
});

interface formValues {
  name: string;
  email: string;
  date_ingreso: string;
  birth_date: string;
  avatar?: File;
  password: string;
  password_confirmation: string;
  role_id: string;
  tags?: any[];
}

export const AddEditForm = () => {
  const { id } = useParams<{ id?: string }>();
  const [loading, setLoading] = useState(true);
  const { getById, post } = useUser();
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null); // State for preview URL

  const { fetchData: fetchRoles } = useRoles();
  const { fetchData: fetchTags } = useTags();
  const [roles, setRoles] = useState<RoleItem_T[]>([]);
  const [tags, setTags] = useState<TagItem[]>([]);
  const { reset, setError, watch, control, setValue, register, handleSubmit, formState: { errors } } = useForm<formValues>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });

  const loadData = async () => {
    try {
      if (id) {
        const fetchedData = await getById(id);
        reset(fetchedData);
        if (fetchedData.tags) {
          setValue('tags', fetchedData.tags.map((tag: TagItem) => tag.id)); // Assuming `tags` in user data is an array of tag objects
          if(fetchedData.avatar.preview_url){
            setAvatarPreview(fetchedData.avatar.preview_url); // Set the initial avatar preview
          }
        }
      }
      const roles: RoleItem_T[] = await fetchRoles();
      const tags: TagItem[] = await fetchTags();
      setRoles(roles);
      setTags(tags);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const isEditMode = !!id;
  const onSubmit = async (data: formValues) => {
    const formData = new FormData();

    // Attach normal fields
    if (id) {
      formData.append('id', id);
    }

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('password_confirmation', data.password_confirmation);
    formData.append('role_id', data.role_id);
    formData.append('birth_date', data.birth_date);
    formData.append('date_ingreso', data.date_ingreso);

    // Attach tags as individual entries
    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag) => {
        formData.append('tags[]', tag); // Backend must handle `tags[]` format
      });
    }

    // Attach files if any
    if (data.avatar)  {
      formData.append('avatar', data.avatar);
      // const file = Array.from(data.files)[0] ?? undefined;
      // if(file) formData.append('avatar', file);
      // Array.from(data.files).forEach(file => {
      //   formData.append('avatar', file); // Append each file separately
      // });
    }

    try {
      const response = await (isEditMode
        ? post('/users/update', formData, { Authorization: 'Bearer ' + token })
        : post('/users', formData, { Authorization: 'Bearer ' + token })
      );

      if (response.statusCode === 200) {
        navigate('/users');
      } else if (response.statusCode === 400) {
        Object.entries(response.data).forEach(([key, value]) => {
          const errorMessages = value as string[];
          setError(key as keyof formValues, {
            type: 'server',
            message: errorMessages.join(', '),
          });
        });
      }
    } catch (error) {
      console.error('Submission Error:', error);
      // MessageToast({ message: "Error submitting the form", type: "error" });
    }
  };

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
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
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

              {/* <div>
                {JSON.stringify(watch(), null, 2)}
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <div>
        <label htmlFor="file">Archivo</label>
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const fileList = e.target.files;
            if (fileList && fileList.length > 0) {
              const file = fileList[0];
              setValue('avatar', file);
              setAvatarPreview(URL.createObjectURL(file));
            }
          }}
          type="file"
          id="file"
        />
      </div>
      <input type="submit" value="Enviar solicitud" />
    </form>
  );
};
