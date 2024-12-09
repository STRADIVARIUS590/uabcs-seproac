import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect } from "react";
import { MessageToast } from "../MessageToast";
import { Controller } from "react-hook-form";
// import { TagItem } from "../Users/AddEditForm";
import { usePublicationsForm } from "@/hooks/publications/usePublicationForm";

export const AddEditForm = () => {
  const { id } = useParams<{ id?: string }>();
  const {
    loadData,
    loading,
    register,
    onSubmit,
    handleSubmit,
    errors,
    tags,
    control,
    // watch,
    cover,
    setCover,
    setValue,
    users,
  } = usePublicationsForm({id});

  useEffect(() => {
    loadData({ id });
  }, [id]);

  if (loading) return <MessageToast message="Cargando..." type="loading" />;
  const isEditMode = !!id;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8 text-center">
            {isEditMode ? "Editar Publicación" : "Agregar Publicación"}
          </h1>
          <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 md:p-8">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="mb-12">
                  <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                    Titulo
                  </label>
                  <input
                    className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                    type="text"
                    {...register("title")}
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}

                  <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                    DOI
                  </label>
                  <input
                    className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                    type="text"
                    {...register("doi")}
                    
                  />
                  {errors.doi && (
                    <p className="text-red-500">{errors.doi.message}</p>
                  )}

                  <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                    Tipo
                  </label>
                  <input
                    className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                    type="text"
                    {...register("type")}
                  />
                  {errors.type && (
                    <p className="text-red-500">{errors.type.message}</p>
                  )}

                  <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                    ISSN / ISBN
                  </label>
                  <input
                    className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                    type="text"
                    {...register("issn_isbn")}
                  />
                  {errors.issn_isbn && (
                    <p className="text-red-500">{errors.issn_isbn.message}</p>
                  )}

                  <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                    Revista
                  </label>
                  <input
                    className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                    type="text"
                    {...register("magazine_name")}
                  />
                  {errors.magazine_name && (
                    <p className="text-red-500">{errors.magazine_name.message}</p>
                  )}
                </div>
              </div>

              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="mb-12">
                  <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                    Autores
                  </label>
                  <input
                    className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                    type="text"
                    {...register("authors")}
                  />
                  {errors.authors && (
                    <p className="text-red-500">{errors.authors.message}</p>
                  )}

                  <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                    Fecha de publicación
                  </label>
                  <input
                    className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                    type="date"
                    {...register("publication_date")}
                  />
                  {errors.publication_date && (
                    <p className="text-red-500">
                      {errors.publication_date.message}
                    </p>
                  )}

                  <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                    Period
                  </label>
                  <input
                    className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2"
                    type="text"
                    {...register("period")}
                  />
                  {errors.period && (
                    <p className="text-red-500">{errors.period.message}</p>
                  )}

                  <div className="mb-4">
                    <label
                      htmlFor="user_id"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Usuario
                    </label>

                    <Controller
                      name="user_id"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          {users &&
                            users.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                        </select>
                      )}
                    />
                  </div>
                  {errors.user_id && (
                    <p className="text-sm text-red-500">
                      {errors.user_id.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div className="mb-12">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Etiquetas
                  </h3>
                  <div>
                    {tags.map((item) => (
                      <label key={item.id} className="flex items-center mb-2">
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
                                }}
                                className="w-4 h-4 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary"
                              />
                            );
                          }}
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {item.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div>
          <label htmlFor="cover">Archivo</label>
          <input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const fileList = e.target.files;
              if (fileList && fileList.length > 0) {
                const file = fileList[0];
                setValue('cover', file);
                setCover(URL.createObjectURL(file));
              }
            }}
            type="file"
            id="file"
          />
        </div>

        {cover && (
          <div className="mt-4">
            <img
              src={cover}
              alt="Avatar Preview"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        )}

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
    </form>
  );
};
