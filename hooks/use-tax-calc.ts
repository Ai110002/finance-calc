"use client";

import { useState, useMemo, useCallback } from "react";
import { nanoid } from "nanoid";
import type {
  TaxInput, TaxResult, IncomeSource, Dependent,
  WorkerType, MaritalStatus, DeductionMethod, IncomeType,
  ItemizedDeductions,
} from "@/lib/tax-types";
import { calculateTax } from "@/lib/calc/tax";
import { PROFESSION_RATES, INCOME_TYPE_LABELS } from "@/lib/tax-constants";

function createIncomeSource(type: IncomeType): IncomeSource {
  const defaultRate = type === "9A" ? PROFESSION_RATES[0] : undefined;
  return {
    id: nanoid(6),
    type,
    label: INCOME_TYPE_LABELS[type] ?? "其他所得",
    grossAmount: 0,
    professionCode: defaultRate?.code,
    expenseRate: defaultRate?.rate,
    netIncome: 0,
  };
}

function createDependent(): Dependent {
  return {
    id: nanoid(6),
    relationship: "child",
    label: "子女",
    age: 10,
    isSenior: false,
    isStudent: false,
    isPreschool: false,
  };
}

const DEFAULT_ITEMIZED: ItemizedDeductions = {
  insurance: 0,
  medicalExpense: 0,
  disasterLoss: 0,
  donation: 0,
  politicalDonation: 0,
  rentalExpense: 0,
  mortgageInterest: 0,
};

export function useTaxCalc() {
  const [workerType, setWorkerType] = useState<WorkerType>("freelancer");
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([
    createIncomeSource("9A"),
  ]);
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>("single");
  const [filingAge, setFilingAge] = useState(30);
  const [spouseAge, setSpouseAge] = useState(30);
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [deductionMethod, setDeductionMethod] = useState<DeductionMethod>("standard");
  const [itemizedDeductions, setItemizedDeductions] = useState<ItemizedDeductions>(DEFAULT_ITEMIZED);
  const [claimRentalDeduction, setClaimRentalDeduction] = useState(false);
  const [rentalAmount, setRentalAmount] = useState(0);
  const [hasDisability, setHasDisability] = useState(false);
  const [spouseHasDisability, setSpouseHasDisability] = useState(false);
  const [hasEducationExpense, setHasEducationExpense] = useState(false);
  const [educationExpenseCount, setEducationExpenseCount] = useState(0);

  // 切換身份時重設收入來源
  const handleWorkerTypeChange = useCallback((type: WorkerType) => {
    setWorkerType(type);
    if (type === "employee") {
      setIncomeSources([createIncomeSource("salary")]);
    } else if (type === "freelancer") {
      setIncomeSources([createIncomeSource("9A")]);
    } else {
      setIncomeSources([createIncomeSource("salary"), createIncomeSource("9A")]);
    }
  }, []);

  const addIncomeSource = useCallback((type: IncomeType) => {
    setIncomeSources(prev => [...prev, createIncomeSource(type)]);
  }, []);

  const removeIncomeSource = useCallback((id: string) => {
    setIncomeSources(prev => prev.length <= 1 ? prev : prev.filter(s => s.id !== id));
  }, []);

  const updateIncomeSource = useCallback((id: string, updates: Partial<IncomeSource>) => {
    setIncomeSources(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const addDependent = useCallback(() => {
    setDependents(prev => [...prev, createDependent()]);
  }, []);

  const removeDependent = useCallback((id: string) => {
    setDependents(prev => prev.filter(d => d.id !== id));
  }, []);

  const updateDependent = useCallback((id: string, updates: Partial<Dependent>) => {
    setDependents(prev => prev.map(d => {
      if (d.id !== id) return d;
      const merged = { ...d, ...updates };
      // 自動判斷
      merged.isSenior = merged.age >= 70;
      merged.isPreschool = merged.age <= 5;
      return merged;
    }));
  }, []);

  const updateItemized = useCallback((field: keyof ItemizedDeductions, value: number) => {
    setItemizedDeductions(prev => ({ ...prev, [field]: value }));
  }, []);

  // 組裝輸入
  const taxInput: TaxInput = useMemo(() => ({
    workerType,
    incomeSources,
    maritalStatus,
    filingAge,
    spouseAge,
    dependents,
    deductionMethod,
    itemizedDeductions,
    claimRentalDeduction,
    rentalAmount,
    hasDisability,
    spouseHasDisability,
    hasEducationExpense,
    educationExpenseCount,
  }), [
    workerType, incomeSources, maritalStatus, filingAge, spouseAge,
    dependents, deductionMethod, itemizedDeductions, claimRentalDeduction,
    rentalAmount, hasDisability, spouseHasDisability, hasEducationExpense,
    educationExpenseCount,
  ]);

  const result: TaxResult = useMemo(() => calculateTax(taxInput), [taxInput]);

  return {
    // State
    workerType, incomeSources, maritalStatus, filingAge, spouseAge,
    dependents, deductionMethod, itemizedDeductions,
    claimRentalDeduction, rentalAmount,
    hasDisability, spouseHasDisability,
    hasEducationExpense, educationExpenseCount,
    result,

    // Actions
    setWorkerType: handleWorkerTypeChange,
    setMaritalStatus,
    setFilingAge,
    setSpouseAge,
    setDeductionMethod,
    setClaimRentalDeduction,
    setRentalAmount,
    setHasDisability,
    setSpouseHasDisability,
    setHasEducationExpense,
    setEducationExpenseCount,
    addIncomeSource,
    removeIncomeSource,
    updateIncomeSource,
    addDependent,
    removeDependent,
    updateDependent,
    updateItemized,
  };
}
