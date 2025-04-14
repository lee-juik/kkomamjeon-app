import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="p-6 max-w-md mx-auto font-sans">
      <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">꽃맘전 - {pages[step]}</h1>

      {step === 0 && (
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <p className="text-lg text-gray-700">꽃으로 마음을 전달하다</p>
            <Button className="w-full text-lg" onClick={next}>시작하기</Button>
          </CardContent>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <CardContent className="p-6 space-y-3">
            <p className="text-lg font-semibold">용도를 선택해주세요:</p>
            {["장례식", "결혼식", "개업", "승진"].map((p) => (
              <Button key={p} className="w-full py-3 text-base" onClick={() => { update("purpose", p); next(); }}>{p}</Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent className="p-6 space-y-3">
            <p className="text-lg font-semibold">상품을 선택해주세요:</p>
            {["3단 근조화환", "2단 축하화환", "개업 화분", "승진 난"].map((p) => (
              <Button key={p} className="w-full py-3 text-base" onClick={() => { update("product", p); next(); }}>{p}</Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <p className="text-lg font-semibold">리본 문구 입력</p>
            <select className="w-full p-3 border border-gray-300 rounded" onChange={e => update("ribbonLeft", e.target.value)}>
              <option>-- 왼쪽 문구 선택 --</option>
              <option value="근조">근조</option>
              <option value="축하">축하</option>
              <option value="삼가 고인의 명복을 빕니다">삼가 고인의 명복을 빕니다</option>
            </select>
            <input className="w-full p-3 border border-gray-300 rounded" placeholder="오른쪽 문구 입력" onChange={e => update("ribbonRight", e.target.value)} />
            <Button className="w-full text-base py-3" onClick={next}>다음</Button>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardContent className="p-6 space-y-3">
            <p className="text-lg font-semibold">주문 정보 입력</p>
            {[
              ["주문자 이름", "sender"],
              ["주문자 전화번호", "senderPhone"],
              ["수령인 이름", "receiver"],
              ["수령인 전화번호", "receiverPhone"],
              ["배송 주소 (장례식장 등)", "address"],
              ["특이사항 (예: ○○장례식장 ○○호)", "note"]
            ].map(([placeholder, field]) => (
              <input key={field} className="w-full p-3 border border-gray-300 rounded" placeholder={placeholder} onChange={e => update(field, e.target.value)} />
            ))}
            <Button className="w-full text-base py-3" onClick={next}>다음</Button>
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <p className="text-lg font-semibold">결제 방식 선택</p>
            {["카드결제", "무통장입금", "카카오페이"].map((p) => (
              <Button key={p} className="w-full py-3 text-base" onClick={() => { update("payment", p); next(); }}>{p}</Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 6 && (
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <p className="text-green-600 font-bold text-xl">주문이 완료되었습니다!</p>
            <Button className="w-full text-base py-3" onClick={next}>마이페이지로 이동</Button>
          </CardContent>
        </Card>
      )}

      {step === 7 && (
        <Card>
          <CardContent className="p-6 space-y-2">
            <p className="text-lg font-semibold">마이페이지</p>
            <div className="text-sm space-y-1">
              <p>상품: {form.product}</p>
              <p>수령인: {form.receiver} / {form.receiverPhone}</p>
              <p>주소: {form.address}</p>
              <p>리본: {form.ribbonLeft} / {form.ribbonRight}</p>
              <p>결제: {form.payment}</p>
            </div>
            <Button className="w-full text-base py-3 mt-3" onClick={() => setStep(0)}>홈으로</Button>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between mt-6 text-sm text-gray-500">
        <Button variant="outline" onClick={prev} disabled={step === 0}>이전</Button>
        <span>Step {step + 1} / {pages.length}</span>
      </div>
    </div>
  );
}

