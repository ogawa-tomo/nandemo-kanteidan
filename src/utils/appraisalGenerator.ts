/**
 * ランダムな鑑定額を生成する
 * @returns 10,000円〜100,000,000円の範囲で1万円単位の鑑定額
 */
export const generateAppraisalValue = (): number => {
  const min = 10000;        // 1万円
  const max = 100000000;    // 1億円
  const step = 10000;       // 1万円単位

  const range = (max - min) / step;
  const random = Math.floor(Math.random() * (range + 1));

  return min + (random * step);
};

/**
 * 鑑定額をカンマ区切りの文字列にフォーマットする
 * @param value - フォーマットする金額
 * @returns カンマ区切りの文字列（例: "5,000,000"）
 */
export const formatCurrency = (value: number): string => {
  return value.toLocaleString('ja-JP');
};
