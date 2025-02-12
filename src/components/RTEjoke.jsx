import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

// import React from 'react'

function RTEjoke({name,control,label,defaultvalue=''}) {
  return (

    <div className="w-ful">
        {label && <label className="inline-block  pl-1">{label}</label>}

        <Controller
            name={name||'content'}
            control={control}
            render={({ field: { onChange } }) =>(
                <Editor
          apiKey="iwcbrrhyj2vb6t9rr8tmihki76cphqt8ylzv72na38jzsqxk" 
            initialValue={defaultvalue}
            init={{
              branding: false,
              menubar: false,
              readonly: false,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          ></Editor>

            )}
            >
        </Controller>
    </div>
  )
}

export default RTEjoke