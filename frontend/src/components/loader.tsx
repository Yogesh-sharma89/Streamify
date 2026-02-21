import { LoaderIcon } from "lucide-react"
import { useThemeStore } from "../store/useThemeStore"


const Loader = () => {
  const theme = useThemeStore((state)=>state.theme);
  return (
    <div data-theme = {theme} className="h-screen w-full flex items-center justify-center">
        <div className="flex items-center gap-4">
          <LoaderIcon className="size-8 animate-spin"/>
          <span className="text-xl font-bold">Loading...</span>
        </div>
    </div>
  )
}

export default Loader
