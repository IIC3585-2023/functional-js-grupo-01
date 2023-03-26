import { useState, Dispatch, SetStateAction } from "react";
import { FilterName, filters, Params, TransformationConfig } from "../../lib/filters";

interface OptionsDialogProps {
  options: TransformationConfig[];
  setOptions: Dispatch<SetStateAction<TransformationConfig[]>>;
}

export default function OptionsDialog({ options, setOptions }: OptionsDialogProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="bg-black text-white active:bg-black-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Set Options
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none p-2">
            <div className=" my-6 mx-auto max-w-screen-md border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between items-center p-4 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-xl font-semibold">Set options</h3>
                <button
                  className="background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
              <ol className="p-4 overflow-y-scroll shadow-inner h-96 bg-gray-50 flex-grow">
                {options.map((transformation, index) => (
                  <OptionsInput
                    key={index}
                    name={transformation.name}
                    values={transformation.options}
                    params={filters[transformation.name].params}
                    onChange={(obj) =>
                      setOptions(
                        options.map(({ name, options }, i) => ({
                          name,
                          options: i === index ? obj : options,
                        }))
                      )
                    }
                    remove={() => setOptions(options.filter((_, i) => i !== index))}
                    up={
                      index > 0
                        ? () =>
                            setOptions((o) => [...o.slice(0, index - 1), o[index], o[index - 1], ...o.slice(index + 1)])
                        : undefined
                    }
                    down={
                      index < options.length - 1
                        ? () => setOptions((o) => [...o.slice(0, index), o[index + 1], o[index], ...o.slice(index + 2)])
                        : undefined
                    }
                  />
                ))}
              </ol>
              <div className="border-t border-solid border-slate-200 flex">
                <AddOption setOptions={setOptions} />
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

function AddOption({ setOptions }: Pick<OptionsDialogProps, "setOptions">): JSX.Element {
  const [name, setName] = useState(Object.keys(filters)[0] as FilterName);

  return (
    <form
      className="flex-grow w-full flex items-center p-4 gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setOptions((o) => [...o, { name, options: {} }]);
        setName(Object.keys(filters)[0] as keyof typeof filters);
      }}
    >
      <select
        name="filter"
        id="filter"
        value={name}
        onChange={(e) => setName(e.target.value as FilterName)}
        className="bg-white flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        {Object.keys(filters).map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-3 py-2 rounded outline-none focus:outline-none  transition-all"
      >
        Add filter
      </button>
    </form>
  );
}

interface OptionsInputProps {
  name: string;
  params: Params;
  values: Record<string, number>;
  onChange: (values: Record<string, number>) => void;
  up?: () => void;
  down?: () => void;
  remove: () => void;
}

function OptionsInput({ params, name, onChange, values, up, down, remove }: OptionsInputProps): JSX.Element {
  return (
    <div className="mb-3 flex border rounded p-2 bg-white">
      <div className="w-64 flex flex-col">
        <div className="flex-grow text-md font-semibold">{name}</div>
        <div className="flex gap-2">
          <button onClick={up}>Up</button>
          <button onClick={down}>Down</button>
          <button onClick={remove}>Remove</button>
        </div>
      </div>
      <ul className="flex gap-2">
        {Object.entries(params).map(([key, params], i) => (
          <li key={i}>
            <label htmlFor={`option-${i}`} className="text-sm text-gray-600">
              {params.name}
            </label>
            <input
              id={`option-${i}`}
              type="number"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
              value={values[key] || params.default}
              placeholder={params.name}
              onChange={(e) => onChange({ ...values, [key]: Number(e.target.value) })}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
