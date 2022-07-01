import { useForm } from "react-hook-form";

import Postcode from "./PostCode";
function OrderForm({onSubmit}) {
  
    const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    setError,
  } = useForm();  
  
  /* 주문-수령 동일인 체크 */
  const select = (e) => {
    
    if(e.target.checked){
        setValue("receiptName", getValues("orderName"));
        setValue("receiptPhone", getValues("orderPhone"));
    } else {
        setValue("receiptName", "");
        setValue("receiptPhone", "");        
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>주문자 정보 </div>
        <br />
        <div>주문자 이름</div>
        <input type="text" {...register("orderName")} />
        <div>주문자 휴대전화(필수)</div>
        <input type="text" {...register("orderPhone")} />
        <div>주문자 이메일(필수)</div>
        <input type="text" {...register("orderEmail")} />

        <br />
        <div>배송지 정보</div>
        <br />

        <div>주문자 정보와 동일</div>
        <input type="checkbox" onChange={select} />

        <div>수령인 이름</div>
        <input type="text" {...register("receiptName")} />
        <div>수령인 휴대전화</div>
        <input type="text" {...register("receiptPhone")} />

        <div>배송지 정보 </div>
        <div>
          <Postcode
            setValue={setValue}
          />
        </div>

        <div>code</div>
        <input type="text" disabled {...register("code")} />
        <div>주소1</div>
        <input
          type="text"
          disabled
          {...register("addr1")}
         
        />
        <div>주소2</div>
        <input type="text" {...register("addr2")} />

        <div>메모</div>
        <input type="text" {...register("memo")} />

        <button type="submit">주문</button>
      </form>
    </>
  );
}

export default OrderForm;