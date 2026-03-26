from bs4 import BeautifulSoup
import glob

# Mappings for individual utility classes
class_map = {
    'flex': 'd-flex',
    'flex-col': 'flex-column',
    'items-center': 'align-items-center',
    'items-end': 'align-items-end',
    'justify-between': 'justify-content-between',
    'justify-around': 'justify-content-around',
    'justify-center': 'justify-content-center',
    'hidden': 'd-none',
    'md:flex': 'd-md-flex',
    'md:hidden': 'd-md-none',
    'w-full': 'w-100',
    'h-full': 'h-100',
    'h-screen': 'vh-100',
    'text-center': 'text-center',
    'text-right': 'text-end',
    'text-left': 'text-start',
    'font-bold': 'fw-bold',
    'font-semibold': 'fw-semibold',
    'font-medium': 'fw-medium',
    'font-light': 'fw-light',
    'italic': 'fst-italic',
    'uppercase': 'text-uppercase',
    'absolute': 'position-absolute',
    'relative': 'position-relative',
    'fixed': 'position-fixed',
    'top-0': 'top-0',
    'bottom-0': 'bottom-0',
    'left-0': 'start-0',
    'right-0': 'end-0',
    'inset-0': 'top-0 bottom-0 start-0 end-0',
    'z-50': 'z-3',
    'z-40': 'z-2',
    'border-b': 'border-bottom',
    'border-t': 'border-top',
    'border-r-2': 'border-end border-2',
    'w-1/2': 'w-50',
    'rounded-xl': 'rounded',
    'rounded-3': 'rounded',
    'rounded-full': 'rounded-circle',
    'shadow-xl': 'shadow-lg',
    'shadow-2xl': 'shadow',
    'shadow-sm': 'shadow-sm',
    'text-5xl': 'display-5',
    'text-4xl': 'fs-2',
    'text-3xl': 'fs-3',
    'text-2xl': 'fs-4',
    'text-xl': 'fs-5',
    'text-lg': 'fs-5',
    'text-sm': 'small',
    'text-xs': 'small',
    'overflow-hidden': 'overflow-hidden',
    'overflow-x-auto': 'table-responsive',
    'mx-auto': 'mx-auto',
    'mt-auto': 'mt-auto',
    'border-none': 'border-0',
    'min-h-screen': 'min-vh-100'
}

def map_class(c):
    if c in class_map: return class_map[c]
    if c.startswith('p-'): return c
    if c.startswith('px-'): return c
    if c.startswith('py-'): return c
    if c.startswith('m-'): return c
    if c.startswith('mx-'): return c
    if c.startswith('my-'): return c
    if c.startswith('mt-'): return c
    if c.startswith('mb-'): return c
    if c.startswith('gap-'): return c
    if c.startswith('opacity-'): return c.replace('opacity-80', 'opacity-75').replace('opacity-70', 'opacity-75').replace('opacity-20', 'opacity-25').replace('opacity-10', 'opacity-25').replace('opacity-5', 'opacity-25')
    if c == 'md:col-span-2': return 'col-12 col-md-6'
    if c == 'lg:col-span-2': return 'col-12 col-lg-8'
    return c

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
    
    # Remove tailwind scripts
    for script in soup.find_all('script'):
        if script.get('src') and 'tailwindcss.com' in script.get('src'):
            script.decompose()
        elif script.get('src') == 'tailwind-config.js':
            script.decompose()
            
    # Add Bootstrap CSS
    head = soup.find('head')
    if head:
        bs_link = soup.new_tag('link', href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', rel='stylesheet')
        head.append(bs_link)
        style = soup.new_tag('style')
        style.string = '''
    .w-10 { width: 2.5rem; } .h-10 { height: 2.5rem; }
    .w-8 { width: 2rem; } .h-8 { height: 2rem; }
    .w-14 { width: 3.5rem; } .h-14 { height: 3.5rem; }
    .w-2 { width: 0.5rem; } .h-2 { height: 0.5rem; }
    .w-48 { width: 12rem; }
    .w-64 { width: 256px !important; }
    .md-ml-64 { margin-left: 0; }
    @media (min-width: 768px) { .md-ml-64 { margin-left: 256px !important; } }
    .tracking-wide { letter-spacing: 0.025em; }
    .tracking-widest { letter-spacing: 0.1em; }
    .tracking-tighter { letter-spacing: -0.05em; }
    .transition-all { transition: all 0.3s ease; }
    .transition-colors { transition: background-color 0.3s, color 0.3s; }
    .transition-opacity { transition: opacity 0.3s; }
    .transition-transform { transition: transform 0.3s; }
'''
        head.append(style)
        
    # Add Bootstrap JS
    body = soup.find('body')
    if body:
        bs_js = soup.new_tag('script', src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js')
        body.append(bs_js)

    # Convert classes
    for tag in soup.find_all(True):
        if tag.has_attr('class'):
            classes = tag['class']
            new_classes = []
            for c in classes:
                if c == 'md:ml-64':
                    new_classes.append('md-ml-64')
                    continue
                mapped = map_class(c)
                new_classes.extend(mapped.split())
            
            # Grid mappings and child resolution
            if 'grid' in classes:
                if 'grid' in new_classes: new_classes.remove('grid')
                if 'row' not in new_classes: new_classes.append('row')
                
                # Assign col classes to children based on grid-cols setting
                for child in tag.find_all(recursive=False):
                    child_classes = child.get('class', [])
                    resolved_child = []
                    for cc in child_classes:
                        mapped_cc = map_class(cc)
                        resolved_child.extend(mapped_cc.split())
                        
                    has_col = any(c.startswith('col-') for c in resolved_child)
                    if 'md:grid-cols-3' in classes and not has_col:
                        resolved_child.extend(['col-12', 'col-md-4'])
                    elif 'md:grid-cols-4' in classes and not has_col:
                        resolved_child.extend(['col-12', 'col-md-3'])
                        
                    if 'col-span-3' in resolved_child:
                        resolved_child.remove('col-span-3')
                        
                    child['class'] = list(dict.fromkeys(resolved_child))
                
                # Cleanup grid suffixes
                for prefix in [c for c in classes if c.startswith('grid-cols') or 'grid-cols' in c]:
                    for r_pref in map_class(prefix).split():
                        if r_pref in new_classes: new_classes.remove(r_pref)
            
            tag['class'] = list(dict.fromkeys(new_classes))
            
    # Fix self-closing elements spacing bug with BS4 formatter
    with open(file, 'w', encoding='utf-8') as f:
        html_str = str(soup)
        f.write(html_str)
