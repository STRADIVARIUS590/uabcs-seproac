import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect } from "react";
import { MessageToast } from "../MessageToast";
import { Controller} from 'react-hook-form';
// import { TagItem } from "../Users/AddEditForm";
import { usePublicationsForm } from "@/hooks/publications/usePublicationForm";


export const AddEditForm = () => {
    const { id } = useParams<{ id ? : string }>();
    const { loadData, loading, register, onSubmit , handleSubmit, errors, tags, control, watch, cover, setCover, setValue } = usePublicationsForm();

    useEffect(() => {
        loadData({id});
    }, [id]);

    if (loading) return <MessageToast message="Cargando..." type="loading" />;

    return <form onSubmit={handleSubmit(onSubmit)}>    
        
        <input type="text" {...register('id')}/>

        <input  type="text" {...register('title')} />
             {errors.title && <p className="text-red-500">{errors.title.message}</p>}
     
        <input  type="text" {...register('type')} />
            {errors.type && <p className="text-red-500">{errors.type.message}</p>}
     
        <input  type="text" {...register('issn_isbn')} />
            {errors.issn_isbn && <p className="text-red-500">{errors.issn_isbn.message}</p>}
     
        <input  type="text" {...register('doi')} />
            {errors.doi && <p className="text-red-500">{errors.doi.message}</p>}
     
        <input  type="text" {...register('magazine_name')} />
            {errors.magazine_name && <p className="text-red-500">{errors.magazine_name.message}</p>}
     
        <input  type="text" {...register('authors')} />
             {errors.authors && <p className="text-red-500">{errors.authors.message}</p>}
     
        <input  type="date" {...register('publication_date')} />
             {errors.publication_date && <p className="text-red-500">{errors.publication_date.message}</p>}
     
        <input  type="text" {...register('period')} />
         {errors.period && <p className="text-red-500">{errors.period.message}</p>}

        <div className="w-full px-4 mb-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-white mb-2">
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
                              console.log(watch('tags'));
                            }}
                            className="w-4 h-4 text-primary border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-primary"
                          />
                        );
                      }}
                    />
                    <span className="text-sm text-gray-700 dark:text-white">{item.name}</span>
                  </label>
                ))}


        <div>
          <label htmlFor="avatar">Archivo</label>
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

                {errors.cover && <p className="text-red-500">{errors.cover.message}</p>}
              </div>
            </div> 
        <input type="submit" />
    </form>

}
