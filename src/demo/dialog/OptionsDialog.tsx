import { useState, useCallback } from "react";
import { defaultOptions } from "../../lib";
import { optionsType } from "../../lib/types";

import OptionsInput from "./OptionsInput";

type OptionsDialogProps = {
  saveOptions: (options: optionsType) => void;
};

export default function OptionsDialog({ saveOptions }: OptionsDialogProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState(defaultOptions);

  /**
   * Callback function for when an option is changed.
   * Sets the new value of the params and if the filter is active.
   * 
   * @param e - SyntheticEvent
   * @param key - The key of the param to change. If null, we change if 
   * the filter is active or not.
   */
  const onChange = useCallback((e: any, key: string|null = null) => {
    const { name, value, checked } = e.target;
    setOptions((prev) => {
      const newOptions = { ...prev };
      if (key) {
        newOptions[name].params[key] = Number(value);
      } else {
        newOptions[name].active = checked;
      }
      return newOptions;
    });
  }, []);

  /**
   * Callback function for when the options are saved.
   * Executes the transform function with the new options.
   * Also closes the dialog.
   */
  const emitCallback = useCallback(() => {
    saveOptions(options);
    setShowModal(false);
  }, []);

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
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Set options
                  </h3>
                </div>
                <div className="relative p-4 flex-auto">
                  {Object.entries(options).map(([key, value], i) => (
                    <OptionsInput
                      key={i}
                      name={key}
                      active={value.active}
                      params={value.params}
                      label={value.name}
                      onChange={onChange}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={emitCallback}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
