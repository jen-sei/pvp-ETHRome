import os

def generate(path, filename, header, injections, outdir, outfilename = ''):
    
    if outfilename == '':
        outfilename = filename

    generated_lines = []
    skip = False

    with open(path+'/'+filename) as file:
        for i, line in enumerate(file):
            if "BEGIN AUTOGEN" in line:
                tokens = line.split()
                if len(tokens) < 4:
                    print("error: bad format, line: ", i)
                    continue

                inj_key = tokens[3]
                if inj_key not in injections:
                    print("error: missing injection of key ", inj_key)
                    continue

                generated_lines.append(injections[inj_key])
                skip = True
            
            if "END AUTOGEN" in line:
                skip = False
                continue
            
            if not skip:
                generated_lines.append(line)

    os.makedirs(os.path.dirname(outdir +'/'+ outfilename), exist_ok=True)
    with open(outdir +'/'+ outfilename, 'w') as file:
        file.writelines([header] + generated_lines)