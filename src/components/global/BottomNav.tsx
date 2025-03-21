function BottomNav({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div className="bg-background/80 border-border/40 fixed right-0 bottom-0 left-0 z-40 border-t px-5 py-3 backdrop-blur-md">
      <div
        className="container mx-auto flex items-center justify-between"
        {...props}
      ></div>
    </div>
  )
}

export default BottomNav
