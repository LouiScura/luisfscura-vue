export default defineAppConfig({
    ui: {
        colors: {
            primary: '#0F363D',
            secondary: '#FFAB91',
            lightSecondary: '#FFD3B6',
            body: '#F5F5F5',
            pb: '#A8E6CF',
            sb: '#84A9AC',
            yellowish: '#FFE8A3',
            heading: '#2D3436',
            paragraph: '#ADAFB0',
        },
        font: {
            sans: 'Montserrat, cursive',
        },
        formField: {
            slots: {
                root: '',
                wrapper: '',
                labelWrapper: 'flex content-center items-center justify-between',
                label: 'block font-medium text-default text-heading',
                container: 'mt-1 relative',
                description: 'text-muted',
                error: 'mt-2 text-error',
                hint: 'text-muted',
                help: 'mt-2 text-muted'
            },
        },
        textarea: {
            slots: {
                root: 'relative inline-flex items-center',
                base: [
                    'w-full rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
                    'transition-colors !bg-white !text-heading'
                ],
            },
            variants: {
                variant: {
                    outline: 'text-highlighted bg-default ring ring-paragraph',
                },
            },
        },
        accordion: {
            slots: {
                root: 'w-full',
                item: 'bg-white rounded-lg px-4 py-2.5 text-black mb-4 border-0 last:mb-0',
            }
        },
        select: {
            variants: {
                variant: {
                    outline: 'text-highlighted bg-default ring ring-paragraph',
                },
            },
        },
        input: {
            variants: {
                variant: {
                    outline: 'text-highlighted bg-default ring ring-paragraph',
                },
            },
            slots: {
                root: 'relative inline-flex items-center w-full',
                base: [
                    'w-full placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
                    'transition-colors !bg-white !py-4 !text-heading'
                ],
            }
        }
    }
})
