import '@styles/globals.css'

export const metadata = {
    title: "PromptVerse",
    description: "A place to write and share prompts",
}

const RootLayout = () => {
  return (
    <html lang='en'>
        <body>
            <div className='main'>
                <div className='gradient' />
            </div>

            <main className='app'>
                {children}
            </main>
        </body>
    </html>        
  )
}

export default RootLayout