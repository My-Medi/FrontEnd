import React, { useState, useRef } from "react";

interface ExpertInputFormProps {
  onNext: () => void;
  onPrev: () => void;
}

interface CareerRow {
  id: number;
  period: string;
  company: string;
  position: string;
  work: string;
}

const ExpertInputForm: React.FC<ExpertInputFormProps> = ({ onNext, onPrev }) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [careerIntro, setCareerIntro] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [careerRows, setCareerRows] = useState<CareerRow[]>([
    {
      id: 1,
      period: "2020.01 - 2023.12",
      company: "건강관리센터",
      position: "영양사",
      work: "영양 상담"
    }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFieldToggle = (field: string) => {
    setSelectedFields(prev => 
      prev.includes(field) 
        ? prev.filter(f => f !== field)
        : [...prev, field]
    );
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(file => 
        file.type.startsWith('image/') || file.type === 'application/pdf'
      );
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleCareerChange = (id: number, field: keyof CareerRow, value: string) => {
    setCareerRows(prev => 
      prev.map(row => 
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const addCareerRow = () => {
    const newId = Math.max(...careerRows.map(row => row.id)) + 1;
    setCareerRows(prev => [...prev, {
      id: newId,
      period: "",
      company: "",
      position: "",
      work: ""
    }]);
  };

  const removeCareerRow = (id: number) => {
    if (careerRows.length > 1) {
      setCareerRows(prev => prev.filter(row => row.id !== id));
    }
  };

  return (
    <div className="w-full bg-white flex flex-col items-center py-[30px]">
      {/* 전문분야 */}
      <div className="w-[716px] mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
        <span className="w-4 h-4 bg-[#1D68FF] rounded-[4px]" />
        <p className="text-[18px] font-medium text-[#121218]">전문분야</p>
      </div>

      <div className="flex items-center gap-[16px] overflow-x-auto">
        {["영양사", "건강관리사", "웰니스 코치", "운동 처방사", "기타"].map((label, i) => (
          <div key={i} className="flex items-center gap-[4px] cursor-pointer" onClick={() => handleFieldToggle(label)}>
            {selectedFields.includes(label) ? (
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20px] h-[20px]"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width={19}
                  height={19}
                  rx="5"
                  fill="#1D68FF"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width={19}
                  height={19}
                  rx="5"
                  stroke="#1D68FF"
                />
                <path
                  d="M6 9.5L9.5 13L14 8.5"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[20px] h-[20px]"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width={19}
                  height={19}
                  rx="5"
                  fill="white"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width={19}
                  height={19}
                  rx="5"
                  stroke="#9DA0A3"
                />
                <path
                  d="M6 9.5L9.5 13L14 8.5"
                  stroke="#9DA0A3"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <p className="text-[14px] font-medium text-[#121218]">{label}</p>
          </div>
        ))}
      </div>
    </div>


      <div className="w-[716px] mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-4 h-4 bg-[#1D68FF] rounded-[4px]" />
          <p className="text-[18px] font-medium text-[#121218]">소속 회사/기관명</p>
        </div>
        <input
          type="text"
          className="w-[400px] h-[45px] rounded-[8px] border border-[#9DA0A3] px-4 text-[14px] text-[#121218] placeholder-[#9DA0A3]"
          placeholder="소속 회사/ 기관명을 입력하세요."
        />
      </div>

      {/* 자격증 업로드 */}
      <SectionTitle title="자격증" />
      <div 
        className={`w-[716px] h-[120px] bg-white border-2 border-[#dbe6ff] rounded-[10px] flex items-center justify-center gap-4 mb-4 cursor-pointer transition-colors ${
          isDragOver ? 'border-[#1D68FF] bg-[#f0f4ff]' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleFileInputClick}
      >
        <svg width={20} height={25} viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.25 9V2.25L18.25 9M2.5 0.5C1.335 0.5 0 1.835 0 3.5V22.5C0 23.2956 0.31607 24.0587 0.87868 24.6213C1.44129 25.1839 2.20435 25.5 3 25.5H17C17.7956 25.5 18.5587 25.1839 19.1213 24.6213C19.6839 24.0587 20 23.2956 20 22.5V7.5L12.5 0.5H2.5Z" fill="#9DA0A3" />
        </svg>
        <p className="text-[16px] font-medium text-[#9da0a3]">여기에 파일을 마우스로 끌어오세요.</p>
      </div>
      
      {/* 업로드된 파일 목록 */}
      {uploadedFiles.length > 0 && (
        <div className="w-[716px] mb-4">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-[#f8f9fa] p-3 rounded-[8px] mb-2">
              <span className="text-[14px] text-[#121218]">{file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-[#dc3545] text-[14px] hover:text-[#c82333]"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="w-[500px] h-[50px] rounded-[10px] bg-[#dbe6ff] flex items-center justify-center gap-4 mb-8">
        <button 
          className="text-[14px] text-[#25282b] font-medium"
          onClick={handleFileInputClick}
        >
          이미지 파일 업로드 <span className="text-[#25282b]">(png,jpg,pdf)</span>
        </button>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf"
        onChange={(e) => handleFileUpload(e.target.files)}
        className="hidden"
      />

      <div>
        <CareerTable 
          careerRows={careerRows}
          onCareerChange={handleCareerChange}
          onRemoveRow={removeCareerRow}
        />
      </div>
      <div>
       <AddButton onAdd={addCareerRow}/>
      </div>

      {/* 경력사항 */}
      <SectionTitle title="경력사항" />
      <CareerTable 
        careerRows={careerRows}
        onCareerChange={handleCareerChange}
        onRemoveRow={removeCareerRow}
      />
      <AddButton onAdd={addCareerRow}/>


      <SectionTitle title="경력소개" />
      <div className="w-[716px] mb-12">
        <textarea
          value={careerIntro}
          onChange={(e) => setCareerIntro(e.target.value)}
          placeholder="경력소개를 입력하세요..."
          className="w-full h-[200px] bg-white border-2 border-[#dbe6ff] rounded-[10px] p-4 text-[14px] text-[#121218] resize-none focus:outline-none focus:border-[#1D68FF]"
        />
      </div>

      {/* 버튼 */}
      <div className="flex gap-[200px]">
        <button onClick={onPrev} className="px-10 py-3 ml-[20px] rounded-[30px] cursor-pointer bg-[#dbe6ff] text-[18px] text-[#121218] font-medium">이전</button>
        <button onClick={onNext} className="w-[216px] px-10 py-3 rounded-[30px] cursor-pointer bg-[#1d68ff] text-[18px] text-white font-semibold">완료</button>
      </div>
    </div>
  );
};



const SectionTitle = ({ title }: { title: string }) => (
  <div className="w-[716px] mb-4 flex items-center gap-4">
    <span className="w-4 h-4 bg-[#1D68FF] rounded-[4px]"></span>
    <p className="text-[18px] font-medium text-[#121218]">{title}</p>
  </div>
);

interface CareerTableProps {
  careerRows: CareerRow[];
  onCareerChange: (id: number, field: keyof CareerRow, value: string) => void;
  onRemoveRow: (id: number) => void;
}

const CareerTable = ({ careerRows, onCareerChange, onRemoveRow }: CareerTableProps) => (
  <div className="w-[716px] mb-4">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-[#f8f9fa]">
          <HeaderCell width="20%">기간</HeaderCell>
          <HeaderCell width="30%">소속</HeaderCell>
          <HeaderCell width="30%">직책</HeaderCell>
          <HeaderCell width="15%">담당업무</HeaderCell>
          <HeaderCell width="5%">삭제</HeaderCell>
        </tr>
      </thead>
      <tbody>
        {careerRows.map((row) => (
          <tr key={row.id}>
            <Cell width="20%">
              <input
                type="text"
                value={row.period}
                onChange={(e) => onCareerChange(row.id, 'period', e.target.value)}
                placeholder="2020.01 - 2023.12"
                className="w-full p-2 text-[14px] border border-[#e9ecef] rounded-[4px] focus:outline-none focus:border-[#1D68FF]"
              />
            </Cell>
            <Cell width="30%">
              <input
                type="text"
                value={row.company}
                onChange={(e) => onCareerChange(row.id, 'company', e.target.value)}
                placeholder="건강관리센터"
                className="w-full p-2 text-[14px] border border-[#e9ecef] rounded-[4px] focus:outline-none focus:border-[#1D68FF]"
              />
            </Cell>
            <Cell width="30%">
              <input
                type="text"
                value={row.position}
                onChange={(e) => onCareerChange(row.id, 'position', e.target.value)}
                placeholder="영양사"
                className="w-full p-2 text-[14px] border border-[#e9ecef] rounded-[4px] focus:outline-none focus:border-[#1D68FF]"
              />
            </Cell>
            <Cell width="15%">
              <input
                type="text"
                value={row.work}
                onChange={(e) => onCareerChange(row.id, 'work', e.target.value)}
                placeholder="영양 상담"
                className="w-full p-2 text-[14px] border border-[#e9ecef] rounded-[4px] focus:outline-none focus:border-[#1D68FF]"
              />
            </Cell>
            <Cell width="5%">
              <button
                onClick={() => onRemoveRow(row.id)}
                className="text-[#dc3545] text-[14px] hover:text-[#c82333] px-2 py-1"
              >
                삭제
              </button>
            </Cell>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const HeaderCell = ({ children, width }: { children: React.ReactNode; width: string }) => (
  <th className={`border border-[#e9ecef] p-3 text-center font-medium text-[14px] ${width}`}>{children}</th>
);

const Cell = ({ children, width }: { children: React.ReactNode; width: string }) => (
  <td className={`border border-[#e9ecef] p-3 text-center text-[14px] ${width}`}>{children}</td>
);

interface AddButtonProps {
  onAdd?: () => void;
}

const AddButton = ({ onAdd }: AddButtonProps) => (
  <div className="w-[716px] mb-8">
    <button 
      className="w-full py-3 bg-[#f8f9fa] border-2 border-dashed border-[#dee2e6] text-[#6c757d] text-[14px] font-medium rounded-md hover:bg-[#e9ecef] transition-colors"
      onClick={onAdd}
    >
      + 경력 추가
    </button>
  </div>
);

export default ExpertInputForm; 