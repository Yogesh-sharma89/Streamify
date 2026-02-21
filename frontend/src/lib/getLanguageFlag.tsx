export const getLanguageFlag = (countryCode:string)=>{
  if(!countryCode) return null;

  const lowercaseCode = countryCode.toLowerCase();

  return (
    <img
    src={`https://flagcdn.com/24x18/${lowercaseCode}.png`}
    alt={`${countryCode}-flag`}
    loading="lazy"
    className="h-3 mr-1 inline-block"
    />
  )

}
