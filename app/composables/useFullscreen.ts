export const useFullscreen = ()=> {
  const isFullscreen = useState( 'isFullscreen', ()=> false )

  const toggle = () => {
    isFullscreen.value = !isFullscreen.value
  }

  return { isFullscreen, toggle }
}