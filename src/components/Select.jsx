import React, { useId } from 'react'

function Select({lable,className,options,...props},ref) {
const id =useId()
  return (
    <div>
        {lable && <lable htmlFor={id} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" type="button">Dropdown button <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>
</button></lable>}

<select {...props} id={id} ref={ref}  className={`className="py-2 text-sm text-gray-700 dark:text-gray-200"${className}`}
        >
             {options?.map((opt)=>(
                <option  key={opt} value={opt} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                    {opt}
                </option>
            ))}
        </select>


</div>
  )
}

export default React.forwardRef( Select)