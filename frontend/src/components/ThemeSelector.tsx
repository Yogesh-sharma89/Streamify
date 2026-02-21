import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore"
import { THEMES } from "../constant";


const ThemeSelector = () => {

  const theme = useThemeStore((state)=>state.theme);
  const setTheme = useThemeStore((state)=>state.setTheme);

  return (
    <div className="dropdown dropdown-end ">

      {/* dropdown trigger  */}

      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5 text-base-content opacity-70 hover:opacity-95"/>
      </button>

      <div tabIndex={-1} className="mt-3 no-scrollbar p-1 pt-3 bg-base-200 dropdown-content menu backdrop-blur-lg w-64 overflow-y-auto border border-base-content/20 max-h-80 rounded-2xl">

        <div className="space-y-2">

          {
            THEMES.map((themes)=>(
              <button key={themes.name}
               className={`w-full px-4 rounded-xl py-3 flex items-center gap-3 transition-colors
                
                ${
                 theme === themes.name ? "bg-primary/10 text-primary":"hover:bg-base-content/10"
                }
                `}
                onClick={()=>setTheme(themes.name)}
              >

               <PaletteIcon className="size-4 text-base-content"/>
               <span className="text-sm font-medium">{themes.label}</span>

               {/* preview colors  */}

               <div className="flex items-center gap-1 ml-auto">
                {
                  themes.colors.map((color,i)=>(
                    <span
                    key={i}
                    className="size-2 rounded-full"
                    style={{backgroundColor:color}}
                    />
                  ))
                }

               </div>

              </button>
            ))
          }

        </div>

      </div>
      
    </div>
  )
}

export default ThemeSelector
