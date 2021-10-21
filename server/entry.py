
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
            todays_entry = os.listdir(f'./static/entries/{self._today}')
            print(f'Entry found for today, {self._today}')
        except Exception as ex:
            if req_new:
                self.instantiate_new_entry()

        # with open(f'./static/entries/{today}') as todays_entry:
        #     if not todays_entry:
        #         print('not today, son')
        #     else: print('yes today, son')

    def instantiate_new_entry(self):
        print(f' --- Creating new Entry for {self._today} ---')
        print(self._path)
        os.mkdir(self._path)
        open(f'{self._path}/one_offs.csv', 'w')
        for item in ['quote', 'joke', 'fact', 'tech_skill', 'non_tech_skill', 'idea', 'notes']:
            print(f'creating {item}.txt')
            open(f'{self._path}/{item}.txt', 'w')
        print('One_off and essays complete')

    def entry(self):
        return os.listdir(self._path)

    def update_entry_item(self, t, data):
        os.remove((path := f'{self._path}/{t}.txt'))
        revised = '=!='.join([data[k] for k in data.keys()])
        print(revised)
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
            item_list = [item for item in file]
            item_dict = {}
            for index, item in item_list:
                item_dict[props[index]] = item
            return json.dumps(item_dict)