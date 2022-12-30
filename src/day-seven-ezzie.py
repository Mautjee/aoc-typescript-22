file1 = open('datadag7_2022.txt', 'r')
lines = file1.readlines()

data = []
for x in lines:
    data.append(x.replace('\n', ''))


# # print(data)


# class Tree:
#     # "Generic tree node."
#     def init(self, name):
#         self.name = name
#         self.children = []
#         self.files = []
#     def add_child(self, node):
#         self.children.append(node)
#     def add_file(self, file):
#         self.files.append(file)
#     def get_child(self, name):
#         for child in self.children:
#             if child == name:
#                 return child

# root = Tree('/')

# root.add_child('e')

# root.get_child('e') # geen idee??

# print(root)


file2 = open('dag7_test.txt', 'r')
lines2 = file2.readlines()


data2 = []

for x in lines2:
    data2.append(x.replace('\n', ''))

# data = data2

print(data)

alle_dir = {}
pointer = ['/']

# hoe moet elke dir eruit zien?
standaard_dir = {
    'file_size_tot': 0,
    'contains': [],
    'filesize_dirs': 0,
    'tot_size': 0
}

alle_dir.update({tuple('/'): standaard_dir})
for x in data:
    if x.startswith('$ cd'):
        # print('er stond cd')
        if x[-1] == '.':
            if len(pointer) > 1:
                for t in range(len(pointer)-1):

                    pointer.reverse()
                    tuple_pointer = tuple(pointer)
                    alle_dir[tuple_pointer[t+1]
                             ]['filesize_dirs'] += alle_dir[tuple_pointer[t]]['file_size_tot']
                    alle_dir[tuple_pointer[t+1]]['tot_size'] = alle_dir[tuple_pointer[t+1]
                                                                        ]['file_size_tot'] + alle_dir[tuple_pointer[t+1]]['filesize_dirs']
                    pointer.reverse()

            pointer.pop()
            print('we gaan eentje terug')
            print('de pointer ziet er op dit moment als volgt uit: ', pointer)
            print('')
        elif x == '$ cd /':
            pointer = ['/']
            print('we zijn helemaal terug bij de hoofd map')
            print('')
        else:
            gesplit = x.split()
            toegevoegde_dir = gesplit[-1]
            print('de toe te voegen dir ziet er als volgt uit: ', toegevoegde_dir)
            print('de toe te voegen dir heeft als type: ', type(toegevoegde_dir))

            pointer.append(toegevoegde_dir)

    if x[0].isdigit():
        print('we gaan nu een file  toevoegen, namelijk : ', x)
        # print(type(x))
        gesplit = x.split()
        print('gesplit ziet er op dit moment uit als: ', gesplit)
        grootte = int(gesplit[0])
        print('de dict ziet er nu als volgt uit: ', alle_dir)
        map_huidig = pointer[-1]
        map_huidig = map_huidig,
        print('hoe de pointer er nu uitziet: ', pointer)
        print('hoe groot het totaal van alle bestanden in deze dir was: ',
              alle_dir[tuple(map_huidig)]['file_size_tot'])
        alle_dir[tuple(map_huidig)]['file_size_tot'] += grootte
        print('de grootte van dit bestand was ', grootte)
        print('het totaal van de  files in deze directory na het toevoegen is: ',
              alle_dir[tuple(map_huidig)]['file_size_tot'])

        # print('de som van de files en alle dirs is: ', som)
        print('')

    if x.startswith('dir'):
        print('we voegen nu een directory toe aan de dict, namelijk: ', x)
        gesplit = x.split()
        key = gesplit[-1]
        losse_dir = {
            'file_size_tot': 0,
            'contains': [],
            'filesize_dirs': 0,
            'tot_size': 0
        }
        key = key,
        print('gesplit -1 ziet er als volgt uit: ', key)
        print('gesplit -1 heeft als type: ', type(key))
        print('de tuple van gesplit -1 ziet er als volgt uit: ', tuple(key))
        alle_dir.update({tuple(key): losse_dir})
        alle_dir[tuple(pointer[-1])]['contains'].append(key)
        print('de dict ziet er op dit moment als volgt uit: ', alle_dir)
        print('de pointer is op dit moment: ', pointer)
        print('')


for x in alle_dir:
    print(x)
    if not alle_dir[x]['contains']:
        alle_dir[x]['tot_size'] = alle_dir[x]['file_size_tot']

print('het komt er uiteindelijk uit te zien als: ', alle_dir)

# voor alle dirs onder de 100k geheugen
tot_onder = 0
for x in alle_dir:
    if alle_dir[x]['tot_size'] <= 100000:
        tot_onder += alle_dir[x]['tot_size']

print(' het totaal onder 100k was: ', tot_onder)
