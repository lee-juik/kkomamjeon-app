import { useState } from "react";

const pages = [
  "인트로", "용도선택", "상품선택", "리본문구", "주문정보", "결제", "주문완료", "마이페이지"
];

export default function App() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    purpose: "",
    product: "",
    ribbonLeft: "",
    ribbonRight: "",
    sender: "",
    senderPhone: "",
    receiver: "",
    receiverPhone: "",
    address: "",
    note: "",
    payment: ""
  });

  const next = () => setStep((s) => Math.min(s + 1, pages.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));
  const update = (field, value) => setForm({ ...form, [field]: value });

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      <h1>꽃맘전 - {pages[step]}</h1>

      {step === 0 && (
        <div>
          <p>꽃으로 마음을 전달하다</p>
          <button onClick={next}>시작하기</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <p>용도를 선택해주세요:</p>
          {["장례식", "결혼식", "개업", "승진"].map((p) => (
            <button key={p} onClick={() => { update("purpose", p); next(); }}>{p}</button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div>
          <p>상품을 선택해주세요:</p>
          {["3단 근조화환", "2단 축하화환", "개업 화분", "승진 난"].map((p) => (
            <button key={p} onClick={() => { update("product", p); next(); }}>{p}</button>
          ))}
        </div>
      )}

      {step === 3 && (
        <div>
          <p>리본 문구 입력</p>
          <select onChange={e => update("ribbonLeft", e.target.value)}>
            <option>-- 왼쪽 문구 선택 --</option>
            <option value="근조">근조</option>
            <option value="축하">축하</option>
            <option value="삼가 고인의 명복을 빕니다">삼가 고인의 명복을 빕니다</option>
          </select>
          <input placeholder="오른쪽 문구 입력" onChange={e => update("ribbonRight", e.target.value)} />
          <button onClick={next}>다음</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <p>주문 정보 입력</p>
          <input placeholder="주문자 이름" onChange={e => update("sender", e.target.value)} />
          <input placeholder="주문자 전화번호" onChange={e => update("senderPhone", e.target.value)} />
          <input placeholder="수령인 이름" onChange={e => update("receiver", e.target.value)} />
          <input placeholder="수령인 전화번호" onChange={e => update("receiverPhone", e.target.value)} />
          <input placeholder="배송 주소 (장례식장 등)" onChange={e => update("address", e.target.value)} />
          <input placeholder="특이사항 (예: ○○장례식장 ○○호)" onChange={e => update("note", e.target.value)} />
          <button onClick={next}>다음</button>
        </div>
      )}

      {step === 5 && (
        <div>
          <p>결제 방식 선택</p>
          {["카드결제", "무통장입금", "카카오페이"].map((p) => (
            <button key={p} onClick={() => { update("payment", p); next(); }}>{p}</button>
          ))}
        </div>
      )}

      {step === 6 && (
        <div>
          <p>주문이 완료되었습니다!</p>
          <button onClick={next}>마이페이지로 이동</button>
        </div>
      )}

      {step === 7 && (
        <div>
          <h2>마이페이지</h2>
          <p>상품: {form.product}</p>
          <p>수령인: {form.receiver} / {form.receiverPhone}</p>
          <p>주소: {form.address}</p>
          <p>리본: {form.ribbonLeft} / {form.ribbonRight}</p>
          <p>결제: {form.payment}</p>
          <button onClick={() => setStep(0)}>홈으로</button>
        </div>
      )}

      <div style={{ marginTop: 30 }}>
        <button onClick={prev} disabled={step === 0}>이전</button>
        <span style={{ margin: "0 10px" }}>Step {step + 1} / {pages.length}</span>
      </div>
    </div>
  );
}
