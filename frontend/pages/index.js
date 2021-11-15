import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [front, setFront] = useState(null);
  const [back, setBack] = useState(null);
  const [model, setModel] = useState("");
  const [plate, setPlate] = useState("");
  const [error, setError] = useState();

  console.log(front, back, model);

  async function handleUpload() {
    const carInfo = {
      model: model,
      plate: plate,
      front: front,
      back: back,
    };

    const upload = await fetch(`http://localhost:1337/cars`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carInfo),
    });

    const uploadResponse = await upload.json();

    if (uploadResponse.error) console.log(uploadResponse);
  }

  return (
    <div className="bg-blue-100 w-screen h-screen flex items-center justify-center">
      {/* Container Starts here */}
      <div className="h-3/4 bg-white p-16 rounded shadow-2x1 w-2/3 p-5 rounded">
        <h2 className="text-3xl font-bold mb-10 text-blue-900">
          Upload Your Car Information
        </h2>
        <form className="h-full space-y-8">
          {/* Form starts here */}
          <div className="h-3/4 flex flex-row">
            {/* Left Half of Form */}
            <div className="w-1/4 flex flex-col mr-96">
              <div>
                <label className="block mb-2 font-bold">Liscense Plate</label>
                <input
                  className="w-full border border-gray-200 p-3 rounded outline-none focus:border-blue-600"
                  type="text"
                  id="plate"
                  onChange={(e) => setPlate(e.target.value)}
                />
              </div>
              <div className="pt-3">
                <label className="block mb-2 font-bold">Car Model</label>
                <input
                  className="w-full border border-gray-200 p-3 rounded outline-none focus:border-blue-600"
                  type="text"
                  id="car_model"
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
            </div>
            {/* right half of form */}
            <div className="flex justify-between">
              <div>
                <label className="block mb-2 font-bold">Front Car Photo</label>
                <input
                  type="file"
                  id="frontcar"
                  onChange={(e) => setFront(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2 font-bold">Back Car Photo</label>
                <input
                  type="file"
                  id="backcar"
                  onChange={(e) => setBack(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            className="block w-full bg-blue-400 p-5 rounded text-gray-900 shadow-3x1"
            onClick={() => handleUpload()}
          >
            Submit
          </button>
          {error ? error : null}
        </form>
      </div>
    </div>
  );
}
