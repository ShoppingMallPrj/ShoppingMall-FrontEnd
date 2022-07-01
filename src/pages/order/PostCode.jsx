import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

const Postcode = ({ code, address, setValue }) => {
  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleComplete = (data) => {
    let fullAddress = data.address; // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    //code.current.value = data.zonecode;
    //address.current.value = fullAddress;
    setValue("code", data.zonecode);
    setValue("addr1", fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <button type="button" onClick={handleClick}>
      Open
    </button>
  );
};

export default Postcode;