import Button from "../../../../components/Button";
import FormField from "../../../../components/FormField";
import FormTitle from "../../../../components/FormTitle";
import Select from "../../../../components/Select";
import MeasurementInput from "../../../../components/Fitness/MeasurementInput";
import { useFitnessGeneralStore } from "../../../../stores/FitnessGeneralStore";
import { useState, useEffect } from "react";

interface StepProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  NEXT_STEP: number;
}

export default function Step1({ setCurrentStep, NEXT_STEP }: StepProps) {
  const { formData, setFormData } = useFitnessGeneralStore();

  const [year, setYear] = useState(formData.birthDate.slice(0, 4));
  const [month, setMonth] = useState(formData.birthDate.slice(4, 6));
  const [day, setDay] = useState(formData.birthDate.slice(6, 8));

  const [errors, setErrors] = useState({
    sex: false,
    birthDate: false,
    height: false,
    weight: false,
  });
  const [showErrors, setShowErrors] = useState(false);

  // 나이 제한
  const currentYear = new Date().getFullYear();
  const MIN_AGE = 19;
  const MAX_AGE = 64;

  const maxBirthYear = currentYear - MIN_AGE;
  const minBirthYear = currentYear - MAX_AGE;

  // 날짜 관련 로직
  const yearOptions = Array.from(
    { length: maxBirthYear - minBirthYear + 1 },
    (_, i) => (maxBirthYear - i).toString()
  );

  const monthOptions = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );

  const dayOptions = () => {
    const y = Number(year);
    const m = Number(month);
    if (!y || !m)
      return Array.from({ length: 31 }, (_, i) =>
        (i + 1).toString().padStart(2, "0")
      );
    const lastDay = new Date(y, m, 0).getDate();
    return Array.from({ length: lastDay }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    );
  };

  useEffect(() => {
    if (year && month && day) {
      setFormData({ birthDate: `${year}${month}${day}` });
      setErrors((prev) => ({ ...prev, birthDate: false }));
    }
  }, [year, month, day, setFormData]);

  const birthDateIncomplete = () => !(year && month && day);

  const handleNext = () => {
    const newErrors = {
      sex: !formData.sex,
      birthDate: birthDateIncomplete(),
      height: !formData.height,
      weight: !formData.weight,
    };
    setErrors(newErrors);
    setShowErrors(true);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    setCurrentStep(NEXT_STEP);
  };

  const handleChange =
    (key: "height" | "weight") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (!isNaN(value)) setFormData({ [key]: value });
    };

  return (
    <>
      <section className="my-8 px-4">
        <FormTitle
          title="OO 님에 대해 알려주세요!"
          description="모두 입력해주세요"
        />
      </section>

      <form
        className="grid grid-cols-2 gap-x-4 gap-y-8 w-[345px] mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* 성별 */}
        <FormField
          label="성별"
          error={showErrors && errors.sex}
          errorMessage="성별을 선택해주세요"
          className="col-span-2"
        >
          <div className="flex gap-4 items-center justify-center w-full">
            <Button
              variant={formData.sex === "M" ? "main" : "white"}
              onClick={() => setFormData({ sex: "M" })}
              style={{
                border: "1px solid",
                borderColor: showErrors && errors.sex ? "red" : "#ccc",
              }}
            >
              남
            </Button>
            <Button
              variant={formData.sex === "F" ? "main" : "white"}
              onClick={() => setFormData({ sex: "F" })}
              style={{
                border: "1px solid",
                borderColor: showErrors && errors.sex ? "red" : "#ccc",
              }}
            >
              여
            </Button>
          </div>
        </FormField>

        {/* 생년월일 */}
        <FormField
          label="생년월일"
          error={showErrors && errors.birthDate}
          errorMessage="생년월일을 선택해주세요"
          className="col-span-2"
        >
          <div className="grid grid-cols-4 gap-2 w-full">
            <Select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              error={showErrors && errors.birthDate}
              className="col-span-2"
            >
              <option value="">YYYY</option>
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>
            <Select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              error={showErrors && errors.birthDate}
              className="col-span-1"
            >
              <option value="">MM</option>
              {monthOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Select>
            <Select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              error={showErrors && errors.birthDate}
              className="col-span-1"
            >
              <option value="">DD</option>
              {dayOptions().map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </div>
        </FormField>

        {/* 키 */}
        <MeasurementInput
          label="키"
          value={formData.height ?? 0}
          onChange={handleChange("height")}
          isError={showErrors && errors.height}
          errorMessage="키를 입력해주세요"
          unit="cm"
          placeholder="0"
        />

        {/* 몸무게 */}
        <MeasurementInput
          label="몸무게"
          value={formData.weight ?? 0}
          onChange={handleChange("weight")}
          isError={showErrors && errors.weight}
          errorMessage="몸무게를 입력해주세요"
          unit="kg"
          placeholder="0"
        />

        {/* 다음 버튼 */}
        <Button variant="main" onClick={handleNext}>
          다음
        </Button>
      </form>
    </>
  );
}
