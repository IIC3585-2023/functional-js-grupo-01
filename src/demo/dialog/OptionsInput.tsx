import { SyntheticEvent } from "react";

type OptionsInputProps = {
  active: boolean,
  params: {
    [name: string]: number
  }
	name: string;
	label: string;
	onChange: (e: SyntheticEvent, key?: string|null) => void;
};

export default function OptionsInput ({ active, params, name, label, onChange }: OptionsInputProps): JSX.Element {
	return (
		<div className="mb-3">
			<div className="flex items-center mb-2">
        <input 
          type="checkbox" 
          checked={active}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          name={name}
          onChange={onChange}
        />
        <label className="ml-2 text-sm font-medium text-gray-900">{label}</label>
      </div>
      {Object.entries(params).map(([key, value], i) => (
        <input
          key={i}
          type="number"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
          value={value}
          name={name}
          onChange={(e) => onChange(e, key)}
        />
      ))}
		</div>
	)
}
