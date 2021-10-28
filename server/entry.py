
import datetime
import pprint
import datetime
import os
import csv
import json

pp = pprint.PrettyPrinter(indent=3)

class Entry():

    def __init__(self, req_new):
        self._today = datetime.date.today()
        self._path = f'./static/entries/{self._today}'
        try:
            # todays_entry = os.listdir(f'./static/entries/{self._today}')
            print(f'Entry found for today, {self._today}')
        except Exception as ex:
            print(ex)
            if req_new:
                self.instantiate_new_entry()

    def instantiate_new_entry(self):
        print(f' --- Creating new Entry for {self._today} ---')
        os.mkdir(self._path)
        for item in ['quote', 'joke', 'fact', 'tech_skill', 'non_tech_skill', 'idea', 'notes', 'one_offs']:
            print(f'creating {item}.txt')
            open(f'{self._path}/{item}.txt', 'w')
        print('One_off and essays complete')

    def entry(self):
        entry_files = ['fact', 'idea', 'joke', 'non_tech_skill', 'tech_skill', 'notes', 'quote']
        dirs = os.listdir(self._path)
        entries = []
        for e in dirs:
            entry_item = {
                'title': (title := e.replace('.txt', '').title()).replace('_', ' '),
                'byline': assign_byline(title),
                'short': title.lower(),
                'bodyContent': '',
                'bylineContent': ''
            }
            file = open(f'{self._path}/{e}')
            line = file.read()
            if len(line):
                spl = line.split('=!=')
                entry_item['bylineContent'] = spl[0]
                entry_item['bodyContent'] = spl[2] if len(spl) > 2 else spl[1]
            else:
                print(e, 'No Line Found')
            file.close()
            if entry_item['short'] in entry_files: entries.append(entry_item)
        return json.dumps(entries)

    def update_entry_item(self, t, data):
        os.remove((path := f'{self._path}/{t}.txt'))
        revised = '=!='.join([data[k] for k in data.keys()])
        file = open(f'{self._path}/{t}.txt', 'w')
        file.write(revised)
        file.close()
        print(f'Updated {t} data saved')
        # writer = csv.writer(f'{self._path}/{type}.txt')

    def entry_item(self, t):
        with (open(f'{self._path}/{t}.txt')) as file:
            l = list(file)[0].split('=!=')
            subtitle, img, body = l[0], l[1], l[2]
            return {'subtitle': subtitle, 'img': img, 'body': body}

    def update_oneoff_item(self, oneoff_type, data):
        self._order = ['vocab', 'artist', 'song', 'code', 'duo', 'recipe', 'am', 'pm', 'read', 'game']
        read_file = open((path := f'{self._path}/one_offs.txt'))
        if len((read_data := read_file.read().split('\n'))):
            read_file.close()
            read_data[self._order.index(oneoff_type)] = data['val']
            write_file = open(path, 'w')
            for r in read_data:
                write_file.write(f'{r}\n')
        else:
            write_file = open(path, 'w')
            print('No oneoff file found. Creating new...')
            for o in self._order:
                write_file.write(f'{o}\n')
        write_file.close()
        return

    def oneoffs(self, type):
        file = open(f'{self._path}/one_offs.txt')
        read_file = file.read().split('\n')
        return {'val': read_file[self._order.index(type)]}

def assign_byline(title):
    print(f'TITLE, {title}')
    if title == 'Quote' or title == 'Joke':
        return 'Source'
    elif title == 'Fact':
        return 'Subject'
    elif title == 'Tech_Skill':
        return 'Stack'
    elif title == 'Non_Tech_Skill':
        return 'Category'
    elif title == 'Idea':
        return 'Requirements'
    else:
        return 'Post Script'