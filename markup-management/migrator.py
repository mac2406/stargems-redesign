import os
import re
import glob

html_files = glob.glob('*.html')

tailwind_to_bootstrap = {
    r'hidden md:flex flex-col': 'd-none d-md-flex flex-column',
    r'flex-col': 'flex-column',
    r'flex items-center': 'd-flex align-items-center',
    r'flex items-end': 'd-flex align-items-end',
    r'flex justify-between': 'd-flex justify-content-between',
    r'justify-between': 'justify-content-between',
    r'items-center': 'align-items-center',
    r'flex': 'd-flex',
    r'space-y-': 'gap-',
    r'space-x-': 'gap-',
    r'grid grid-cols-1 md:grid-cols-3 gap-6': 'row g-4',
    r'grid grid-cols-1 md:grid-cols-4 gap-6': 'row g-4',
    r'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6': 'row g-4',
    r'grid grid-cols-1 lg:grid-cols-3 gap-12': 'row g-5',
    r'md:col-span-2': 'col-12 col-md-6',
    r'lg:col-span-2': 'col-12 col-lg-8',
    r'col-span-3 lg:col-span-2': 'col-12 col-lg-8',
    r'gap-1': 'gap-1', r'gap-2': 'gap-2', r'gap-3': 'gap-3', r'gap-4': 'gap-4', r'gap-6': 'gap-4', r'gap-8': 'gap-5', r'gap-12': 'gap-5',
    r'p-8 lg:p-12': 'p-4 p-lg-5',
    r'p-8': 'p-4', r'p-6': 'p-4', r'p-4': 'p-3', r'p-3': 'p-3', r'p-2': 'p-2', r'p-1': 'p-1',
    r'px-8': 'px-4', r'px-6': 'px-4', r'px-4': 'px-3', r'px-3': 'px-3', r'px-2': 'px-2',
    r'py-8': 'py-4', r'py-6': 'py-4', r'py-4': 'py-3', r'py-3': 'py-3', r'py-2': 'py-2',
    r'pb-8': 'pb-4', r'pb-6': 'pb-4', r'pb-4': 'pb-3', r'pb-2': 'pb-2',
    r'pt-12': 'pt-5', r'pt-8': 'pt-4', r'pt-6': 'pt-4',
    r'mb-12': 'mb-5', r'mb-8': 'mb-4', r'mb-6': 'mb-4', r'mb-4': 'mb-3', r'mb-2': 'mb-2', r'mb-1': 'mb-1',
    r'mt-12': 'mt-5', r'mt-8': 'mt-4', r'mt-6': 'mt-4', r'mt-4': 'mt-3', r'mt-2': 'mt-2', r'mt-1': 'mt-1',
    r'mt-auto': 'mt-auto',
    r'w-full': 'w-100', r'w-1/2': 'w-50', r'h-full': 'h-100', r'h-screen': 'vh-100',
    r'text-5xl': 'display-5', r'text-4xl': 'fs-2', r'text-3xl': 'fs-3', r'text-2xl': 'fs-4', r'text-xl': 'fs-5', r'text-lg': 'fs-5', r'text-sm': 'small', r'text-xs': 'small',
    r'font-semibold': 'fw-semibold', r'font-medium': 'fw-medium', r'font-bold': 'fw-bold', r'font-light': 'fw-light',
    r'text-center': 'text-center', r'text-right': 'text-end', r'text-left': 'text-start',
    r'rounded-xl': 'rounded', r'rounded-full': 'rounded-circle', r'rounded-3': 'rounded', r'rounded': 'rounded',
    r'shadow-xl': 'shadow-lg', r'shadow-2xl': 'shadow', r'shadow-sm': 'shadow-sm',
    r'absolute': 'position-absolute', r'relative': 'position-relative', r'fixed': 'position-fixed',
    r'top-0': 'top-0', r'bottom-0': 'bottom-0', r'left-0': 'start-0', r'right-0': 'end-0',
    r'inset-0': 'top-0 bottom-0 start-0 end-0',
    r'z-50': 'z-3', r'z-40': 'z-2',
    r'border-b': 'border-bottom', r'border-t': 'border-top', r'border-r-2': 'border-end',
    r'w-2 h-2': 'w-2 h-2',
    r'w-10 h-10': 'w-10 h-10',
    r'w-8 h-8': 'w-8 h-8',
    r'w-14 h-14': 'w-14 h-14',
    r'bg-emerald-500': 'bg-success', r'text-emerald-600': 'text-success',
    r'bg-error': 'bg-danger',
    r'overflow-hidden': 'overflow-hidden',
    r'overflow-x-auto': 'table-responsive',
    r'italic': 'fst-italic',
    r'uppercase': 'text-uppercase',
    r'opacity-80': 'opacity-75', r'opacity-70': 'opacity-75', r'opacity-20': 'opacity-25', r'opacity-10': 'opacity-25', r'opacity-5': 'opacity-25'
}

for file in html_files:
    print(f"Processing {file}")
    with open(file, 'r') as f:
        content = f.read()
    
    # 1. Replace tailwind script with Bootstrap CSS
    content = re.sub(
        r'<script src="https://cdn\.tailwindcss\.com\?.*?"></script>',
        r'<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">\n  <style>\n    .w-10 { width: 2.5rem; }\n    .h-10 { height: 2.5rem; }\n    .w-8 { width: 2rem; }\n    .h-8 { height: 2rem; }\n    .w-14 { width: 3.5rem; }\n    .h-14 { height: 3.5rem; }\n    .w-2 { width: 0.5rem; }\n    .h-2 { height: 0.5rem; }\n    .w-48 { width: 12rem; }\n    .w-64 { width: 256px; }\n    .md\\:ml-64 { margin-left: 0; }\n    @media (min-width: 768px) {\n       .md\\:ml-64 { margin-left: 256px !important; }\n    }\n    .tracking-wide { letter-spacing: 0.025em; }\n    .tracking-widest { letter-spacing: 0.1em; }\n    .tracking-tighter { letter-spacing: -0.05em; }\n    .transition-all { transition: all 0.3s ease; }\n    .transition-colors { transition: background-color 0.3s, color 0.3s; }\n    .transition-opacity { transition: opacity 0.3s; }\n  </style>',
        content
    )
    
    # Add bootstrap script before </body>
    if '<script src="https://cdn.jsdelivr.net/npm/bootstrap' not in content:
        content = content.replace('</body>', '  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>\n</body>')
    
    # Remove tailwind config script
    content = re.sub(r'<script src="tailwind-config\.js"></script>', '', content)
    
    # Simple replace
    for original, bs_class in tailwind_to_bootstrap.items():
        # Using word boundaries to avoid replacing parts of strings except when starting with a space/quote
        content = re.sub(r'\b' + original + r'\b', bs_class, content)

    # Some manual tricky replaces
    content = content.replace('grid md:grid-cols-3', 'row')
    
    # Handle the side nav width explicitly
    content = content.replace('w-64', 'w-64')

    with open(file, 'w') as f:
        f.write(content)

print("Migration completed.")
