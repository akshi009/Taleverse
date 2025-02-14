import { Controller } from "react-hook-form";

function RTEtale({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="10"
            value={value}
            onChange={onChange}
            placeholder="Enter text here..."
          />
        )}
      />
    </div>
  );
}

export default RTEtale;
