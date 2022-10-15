import os
import shutil

if __name__ == "__main__":

    pycache_dirs = []

    for root, *_ in os.walk(os.getcwd()):
        if root.endswith("__pycache__") and "venv" not in root:
            pycache_dirs.append(root)
    
    for pycache_dir in pycache_dirs:
        shutil.rmtree(pycache_dir)
