from tkinter import *
from tkinter import ttk
import pandas as pd
import numpy as np
from matplotlib.backends.backend_tkagg import (
                                    FigureCanvasTkAgg, NavigationToolbar2Tk)
from matplotlib.figure import Figure
import matplotlib
from publication_3dplot import Publication_3dplot
from publication_thickness import Publication_thickness


class Publication_notebook(Frame):
    def __init__(self, master, data):
        super().__init__(master)

        nb = ttk.Notebook(master)
        nb.pack(fill = 'both', expand = True)


        coords = pd.read_csv('Coords_center.csv', header = None)
        x, y = coords.iloc[:,0].to_numpy()/1000, coords.iloc[:, 1].to_numpy()/1000
        c = np.array([v for v in data.iloc[:,0]])

        fig = Figure(figsize=(7.5, 6), dpi = 100)
        ax = fig.add_subplot(111)

        cax=ax.scatter(x, y, c = c, s = 140, cmap = 'jet', marker = 's')
        cbar=fig.colorbar(cax, ticks = np.linspace(min(c), max(c), num = 9))

        cbar.ax.set_title('nm')
        ax.set_title('Thickness')

        frame2 = ttk.Frame(nb)
        nb.add(frame2,text='Thickness figure')
        content2 = Publication_thickness(frame2,  c, ax,fig, cbar, cax)
        content2.pack(fill = 'both', expand = True)
        frame1 = ttk.Frame(nb)
        nb.add(frame1,text='3D figure')
        content1 = Publication_3dplot(frame1, data)
        content1.pack(fill = 'both', expand = True)




def main():
    root = Tk()
    data = pd.read_csv('data.txt', header = None)
    Publication_notebook(root, data).pack(fill = 'both', expand = True)
    root.mainloop()

if __name__=='__main__':
    main()
