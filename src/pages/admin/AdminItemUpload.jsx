import ImageUploading from "react-images-uploading";
import { fetchCreateItem } from "../../api";
import { useState } from "react";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import { useEffect } from "react";

const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40rem;
  height: 60rem;
  margin-bottom: 2rem;
`;

const JoinInput = styled.input`
  border: 1px solid black;
  padding-left: 0.5rem;
  height: 2.5rem;
  color: ${(props) => (props.errors ? "red" : "black")};
  border: ${(props) => (props.errors ? "1px solid red" : "1px solid black")};
  &::placeholder {
    font-size: 1.2rem;
    font-weight: 500;
    text-transform: uppercase;
    color: ${(props) => (props.errors ? "red" : "black")};
  }
  &:focus {
    border: ${(props) => (props.errors ? "1px solid red" : "1px solid black")};
    outline: none;
    /* background-color: transparent; */
  }
`;

const JoinError = styled.span``;

function AdminItemUpload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [options, setOptions] = useState([]); //아이템 옵션 배열
  const [images, setImages] = useState([]); // 아이템 이미지들
  const [profile, setProfile] = useState(); //프로필 이미지

  //form 전송 시 call 됨
  const onSubmit = async (data, event) => {
    // form 객체 생성
    const formData = new FormData();

    //data에서 form data로 복사
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    //아이템 옵션들 추가
    for (let i = 0; i < options.length; i += 1) {
      formData.append("option", JSON.stringify(options[i]));
    }

    //프로필 추가
    formData.append("profile", profile);

    //for 문을 돌면서 이미지들을 formdata에 append한다
    for (let i = 0; i < images.length; i += 1) {
      formData.append("file", images[i].file); //아이템 일반 이미지
    }

    /* form data 출력 */
    for (var d of formData.entries()) {
      console.log(d);
    }

    /* 서버에 전송 */
    try {
      const res = await fetchCreateItem(formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    event.preventDefault();
  };

  // 프로필 업로더
  const onProfile = (e) => {
    console.log(e.target.files[0]);
    setProfile(e.target.files[0]);
  };

  //이미지 업로드 시 call
  const imageChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const optionChange = (optionList) => {
    console.log(optionList);
    setOptions(optionList);
  };

  return (
    <>
      <JoinForm onSubmit={handleSubmit(onSubmit)}>
        <JoinInput
          type="text"
          placeholder="itemName"
          {...register("itemName", {
            required: "itemName is required",
            minLength: {
              value: 3,
              message: "itemName must be at least 3 digits",
            },
          })}
        />
        <JoinError>{errors?.itemName?.message}</JoinError>

        {/* 아이템 카테고리 */}
        <JoinInput
          type="text"
          placeholder="itemCategory"
          {...register("itemCategory", {
            required: "itemCategory is required",
            minLength: {
              value: 3,
              message: "itemCategory must be at least 3 digits",
            },
          })}
        />
        <JoinError>{errors?.itemCategory?.message}</JoinError>

        <JoinInput
          type="text"
          placeholder="gender"
          {...register("gender", {
            required: "gender is required",
            minLength: {
              value: 1,
              message: "gender must be at least 1 digits",
            },
          })}
        />
        <JoinError>{errors?.gender?.message}</JoinError>

        {/* 아이템 설명 */}
        <JoinInput
          type="text"
          placeholder="itemDescription"
          {...register("itemDescription", {
            required: "itemDescription is required",
            minLength: {
              value: 3,
              message: "itemCategory must be at least 3 digits",
            },
          })}
        />
        <JoinError>{errors?.itemDescription?.message}</JoinError>

        {/* 아이템 가격 */}
        <JoinInput
          type="number"
          placeholder="itemPrice"
          {...register("itemPrice", {
            required: "itemPrice is required",
          })}
        />
        <JoinError>{errors?.itemPrice?.message}</JoinError>

        {/* 이미지 프로필 업로드 */}
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif,image/webp"
          name="profile"
          onChange={onProfile}
        ></input>

        {/* 이미지 업로드 (외부 라이브러리 사용) */}
        <ImageUploading
          multiple
          value={images}
          onChange={imageChange}
          maxNumber={5}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                type="button"
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              &nbsp;
              <button type="button" onClick={onImageRemoveAll}>
                Remove all images
              </button>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image["data_url"]} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button type="button" onClick={() => onImageUpdate(index)}>
                      Update
                    </button>
                    <button type="button" onClick={() => onImageRemove(index)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
        <OptionUploader onChange={optionChange} />
        <button type="submit">등록</button>
      </JoinForm>
    </>
  );
}

/* 옵션 업로드 하는 컴포넌트 */
function OptionUploader({ onChange }) {
  const [inputs, setInputs] = useState({
    optionContent: "",
    optionStock: "",
  });

  const [options, setOptions] = useState([]); //아이템 옵션 배열

  useEffect(() => {
    onChange(options);
  }, [options]);

  const onTextChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  //항목 추가
  const onAdd = () => {
    if (inputs.optionContent === "" || inputs.optionStock === 0) return;

    setOptions((options) => [...options, inputs]);
    onChange(options);
    setInputs({
      optionContent: "",
      optionStock: 0,
    });
  };

  /* 항목 삭제 */
  const onDelete = (i) => {
    setOptions((options) => options.filter((optoion, index) => index !== i));
    onChange(options);
  };

  return (
    <>
      {options.map((option, index) => {
        return (
          <div>
            <div>항목 : {option.optionContent}</div>
            <div>수량 : {option.optionStock}</div>
            <button
              type="button"
              onClick={() => {
                onDelete(index);
              }}
            >
              삭제
            </button>
          </div>
        );
      })}
      <input
        name="optionContent"
        placeholder="옵션 항목"
        onChange={onTextChange}
        value={inputs.optionContent}
      />
      <input
        type="number"
        name="optionStock"
        placeholder="10"
        onChange={onTextChange}
        value={inputs.optionStock}
      />
      <button type="button" onClick={onAdd}>
        옵션 등록
      </button>
    </>
  );
}

export default AdminItemUpload;
