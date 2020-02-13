from PIL import Image
import math

class Montage:
    """docstring for Montage"""
    def __init__(self):
        super(Montage, self).__init__()
        self.__imgs = []

    def generate_img(self):
        row_size = math.ceil(math.sqrt(len(self.__imgs)))
        size = (row_size, len(self.__imgs)//row_size + 1)
        margin = 10
        width = max(image.size[0]+margin for image in self.__imgs) * size[0]
        height = max(image.size[1]+margin for image in self.__imgs) * size[1]
        montage = Image.new(mode='RGBA', size=(width, height), color=(0,0,0,0))
        
        # for i, image in enumerate(self.__imgs):
        #     montage.paste(image, (i%size[0] * width//size[0], i//size[0] * height//size[1]))

        # https://stackoverflow.com/questions/17555345/creating-a-montage-of-pictures-in-python
        max_x = 0
        max_y = 0
        offset_x = 0
        offset_y = 0
        for i,image in enumerate(self.__imgs):
            montage.paste(image, (offset_x, offset_y))

            max_x = max(max_x, offset_x + image.size[0])
            max_y = max(max_y, offset_y + image.size[1])

            if i % row_size == row_size-1:
                offset_y = max_y + margin
                offset_x = 0
            else:
                offset_x += margin + image.size[0]

        montage = montage.crop((0, 0, max_x, max_y))
        return montage

    def __add__(self, other):
        new_montage = Montage()
        new_montage.__imgs = self.__imgs + [other]
        return new_montage

