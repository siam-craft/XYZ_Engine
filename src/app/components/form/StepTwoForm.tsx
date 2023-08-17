const StepTwoForm = ({ register }: any) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="mb-6">
        <label
          htmlFor="maxX"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Max X
        </label>
        <input
          {...register("maxX")}
          type="text"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Max value of x"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="maxX"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Min X
        </label>
        <input
          {...register("minX")}
          type="text"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Max value of x"
        />
      </div>
    </div>
  );
};

export default StepTwoForm;
