import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

const Container = styled.div`
  height: 125vh;
  width: 100%;
  margin: auto;
  top: 0;
  left: 0;
  background-color: rgb(219, 234, 254);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormBackground = styled.div`
  height: 75%;
  width: 66.66%;
  background-color: white;
  padding-left: 5rem;
  padding-right: 5rem;
  padding-top: 3rem;
  border-radius: 25px;
`;

const FormTitle = styled.div`
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 10;
  color: #1e3a8a;
  padding-bottom: 2rem;
`;

const FormContainer = styled.div`
  height: 75%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 2.5rem;
`;

const LeftForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 10rem;
`;

const InputLabels = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const FormInputs = styled.input`
  width: 15rem;
  height: 3rem;
  border: 1px solid;
  padding-left: 0.5rem;
  border-radius: 5px;
  focus: rgb(96, 165, 250);
`;

const RightForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 22.5rem;
`;

const ImgContainer = styled.img`
  width: 300px;
  height: 300px;
  object-fit: contain;
`;

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
    <Container>
      <FormBackground>
        <FormTitle>Upload Your Car Information</FormTitle>
        <form className="h-full space-y-8">
          <FormContainer>
            <LeftForm>
              <InputContainer>
                <InputLabels>Liscense Plate</InputLabels>
                <FormInputs
                  type="text"
                  id="plate"
                  onChange={(e) => setPlate(e.target.value)}
                />
              </InputContainer>
              <InputContainer>
                <InputLabels>Car Model</InputLabels>
                <FormInputs
                  type="text"
                  id="car_model"
                  onChange={(e) => setModel(e.target.value)}
                />
              </InputContainer>
            </LeftForm>
            {/* right half of form */}
            <RightForm>
              <ImageUploadContainer>
                <InputLabels>Front Car Photo</InputLabels>
                {front === null ? (
                  <ImgContainer src="uploadicon.png" />
                ) : (
                  <ImgContainer src={front} />
                )}
                <input
                  className="pt-3"
                  type="file"
                  id="frontcar"
                  onChange={(e) => setFront(e.target.value)}
                />
              </ImageUploadContainer>
              <ImageUploadContainer>
                <InputLabels>Back Car Photo</InputLabels>
                {back === null ? (
                  <ImgContainer src="uploadicon.png" />
                ) : (
                  <ImgContainer src={back} />
                )}
                <input
                  className="pt-3"
                  type="file"
                  id="backcar"
                  onChange={(e) => setBack(e.target.value)}
                />
              </ImageUploadContainer>
            </RightForm>
          </FormContainer>
          <button
            type="button"
            className="block w-full bg-blue-400 p-5 rounded text-gray-900 shadow-3x1"
            onClick={() => handleUpload()}
          >
            Submit
          </button>
          {error ? error : null}
        </form>
      </FormBackground>
    </Container>
  );
}
