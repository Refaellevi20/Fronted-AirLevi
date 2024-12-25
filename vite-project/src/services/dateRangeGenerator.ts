export const dateRangeGenerator = (): string => {
  const today = new Date()

  const randomStartOffset = Math.floor(Math.random() * 30) + 1
  const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + randomStartOffset)

  const randomEndOffset = Math.floor(Math.random() * 5) + 3
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + randomEndOffset)

  const monthName = startDate.toLocaleString('en-US', { month: 'short' })
  const startDay = startDate.getDate()
  const endDay = endDate.getDate()

  return `${monthName} ${startDay}–${endDay}`
}