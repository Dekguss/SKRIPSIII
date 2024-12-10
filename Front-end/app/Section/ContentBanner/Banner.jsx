import React from "react";

export default function Banner() {
  return (
    <div className="wraper-image gap-4 grid grid-cols-12">
      <div className="col-span-9 flex items-center bg-white rounded-xl h-[400px] w-full imgMotor border shadow">
        <div className="text-justify ps-10">
          <div className="flex gap-2">
            <div className="badge badge-neutral bg-blue-600 border-none py-[14px] ps-5 pe-3 mb-4 text-white">
              New Relase 🔥
            </div>
            <div className="badge badge-neutral bg-blue-600 border-none py-[14px] px-3 mb-4 text-white">
              2024
            </div>
          </div>
          <h1 className="text-5xl font-semibold text-gray-700">Vespa LX 125</h1>

          <p className="font-reguler mt-4 text-[14px] text-gray-700/80 w-[50%]">
            Vespa LX 125 has a fresh and new look and keeping its original
            undisputed elegance and class. It comes with a new refreshed design
            and style, combining rich heritage and modernity, providing the
            Vespa experience, and delivering the brand experience of riding good
            while also looking good.
          </p>
        </div>
      </div>
      <div className="col-span-3 flex justify-center items-end rounded-xl bg-white imgMotorOnly h-[400px] border shadow">
        <h1 className="mb-14 font-semibold text-gray-700 text-2xl">
          Vespa LX 125
        </h1>
      </div>
    </div>
  );
}
