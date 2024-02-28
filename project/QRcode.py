import qrcode

codeText = 'https://536a-115-43-147-129.ngrok-free.app'	#網址
img = qrcode.make(codeText)
print(type(img))
img.save("web-project.jpg")	#儲存QRcode的jpg檔名