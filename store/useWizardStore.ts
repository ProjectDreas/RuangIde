import { create } from 'zustand';

export interface DataUser {
  tujuan: string;
  modal: string;
  minat: string[];
  lokasi: string;
  waktu: string;
  preferensi: string;
  tambahan: string;
}

interface WizardState {
  currentStep: number;
  dataUser: DataUser;
  isGenerating: boolean;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (key: keyof DataUser, value: any) => void;
  toggleMinat: (minatId: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  resetWizard: () => void;
}

const initialData: DataUser = {
  tujuan: "",
  modal: "",
  minat: [],
  lokasi: "",
  waktu: "",
  preferensi: "",
  tambahan: ""
};

export const useWizardStore = create<WizardState>((set) => ({
  currentStep: 0, // 0 = Home, 1-7 = Form, 8 = Loading/Result
  dataUser: initialData,
  isGenerating: false,
  
  setStep: (step) => set({ currentStep: step }),
  
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 8) })),
  
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
  
  updateData: (key, value) => set((state) => ({
    dataUser: { ...state.dataUser, [key]: value }
  })),
  
  toggleMinat: (minatId) => set((state) => {
    const currentMinat = state.dataUser.minat;
    let newMinat;
    
    if (currentMinat.includes(minatId)) {
      newMinat = currentMinat.filter((id) => id !== minatId);
    } else {
      if (currentMinat.length < 3) {
        newMinat = [...currentMinat, minatId];
      } else {
        newMinat = currentMinat;
      }
    }
    
    return { dataUser: { ...state.dataUser, minat: newMinat } };
  }),
  
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  
  resetWizard: () => set({ currentStep: 0, dataUser: initialData, isGenerating: false })
}));
