import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { Phone, MapPin, ExternalLink, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

// 스크롤 애니메이션 컴포넌트
interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const Reveal: React.FC<RevealProps> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: '0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-200 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export const ConsultationForm: React.FC = () => {
  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // PC 환경 (1024px 이상)에서는 상담신청 네이버 폼 새창 열기
    // 모바일 환경에서는 기본 href="tel:15996529" 작동 (전화 연결)
    const isPc = typeof window !== 'undefined' && window.innerWidth >= 1024;
    if (isPc) {
      e.preventDefault();
      window.open("https://naver.me/G1w8Gyro", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="consultation" className="py-12 md:py-20 bg-yellow-400 text-black scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* 기존 텍스트와 상담신청 버튼 영역을 좌우로 나란히 배치 */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          
          {/* Left Text */}
          <div className="space-y-6">
            <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/10 border border-black/20 text-xs font-bold text-black mb-3">
                <Sparkles size={14} />
                <span>국비지원 100% 무료과정 상담</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4 tracking-tight">
                망설이지 마세요.<br/>
                AI 전문가가 <br/>
                친절하게 안내해드립니다.
              </h2>
              <p className="text-base md:text-lg font-medium text-black/85 mb-6 leading-relaxed">
                국비지원 자격 여부부터 취업 및 커리큘럼까지<br/>
                <span className="font-bold underline decoration-2 underline-offset-4">부담 없이 1:1 맞춤 무료상담을 받아보세요.</span>
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-3 bg-black/5 p-3.5 rounded-xl border border-black/10">
                  <div className="w-11 h-11 bg-black text-yellow-400 rounded-full flex items-center justify-center shrink-0 shadow-md">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-black/70">전화 교육문의</p>
                    <a 
                      href="tel:15996529" 
                      onClick={handlePhoneClick}
                      className="text-xl font-black text-black hover:opacity-80 transition-opacity block cursor-pointer"
                      title="모바일: 전화연결 / PC: 상담신청 폼 새창"
                    >
                      1599-6529
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-black/5 p-3.5 rounded-xl border border-black/10">
                  <div className="w-11 h-11 bg-black text-yellow-400 rounded-full flex items-center justify-center shrink-0 shadow-md">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-black/70">교육장소</p>
                    <p className="text-lg font-black text-black">한국직업능력교육원 안산</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 text-sm font-bold text-black/80">
                <CheckCircle size={16} className="text-black" />
                <span>선착순 정원 마감 시 조기 종료될 수 있습니다.</span>
              </div>
            </Reveal>
          </div>

          {/* Right: 새롭게 꾸며진 상담신청 액션 카드 (기존 문의폼 영역 대체) */}
          <Reveal delay={200} className="w-full">
            <div className="bg-black text-white rounded-3xl p-6 sm:p-9 shadow-2xl border border-white/10 relative overflow-hidden group">
              {/* 장식용 배경 글로우 */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none group-hover:bg-yellow-400/30 transition-all duration-500" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-start space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 text-xs font-black">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
                  간편 온라인 상담신청 접수중
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    네이버 폼으로 <br />
                    <span className="text-yellow-400">1분 만에 상담 신청</span>하기
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    복잡한 절차 없이 간편하게 문의를 남겨주시면, 전문 상담사가 확인 후 맞춤형 지원 혜택 및 수강 안내를 드립니다.
                  </p>
                </div>

                {/* 혜택 요약 칩 */}
                <div className="grid grid-cols-2 gap-2 w-full pt-1">
                  <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-3 text-left">
                    <p className="text-[11px] text-gray-400 font-bold">교육비 전액</p>
                    <p className="text-sm font-black text-yellow-400">95~100% 국비 지원</p>
                  </div>
                  <div className="bg-zinc-900/80 border border-white/10 rounded-xl p-3 text-left">
                    <p className="text-[11px] text-gray-400 font-bold">훈련 장려금</p>
                    <p className="text-sm font-black text-yellow-400">매월 최대 지급 혜택</p>
                  </div>
                </div>

                {/* 상담신청 버튼 (클릭 시 새 창 열림) */}
                <a
                  href="https://naver.me/G1w8Gyro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 inline-flex items-center justify-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-lg py-4 px-6 rounded-2xl shadow-[0_10px_25px_rgba(250,204,21,0.35)] hover:shadow-[0_14px_30px_rgba(250,204,21,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group/btn"
                >
                  <span>지금 바로 상담신청하기</span>
                  <ArrowRight size={22} className="group-hover/btn:translate-x-1.5 transition-transform" />
                  <ExternalLink size={18} className="opacity-70" />
                </a>

                <p className="text-xs text-center text-gray-400 w-full pt-1">
                  버튼 클릭 시 공식 네이버 상담 신청 페이지가 새 창으로 열립니다.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
