# 打包时排除部分文件和文件夹，其余全部打包

zip -r ai-eng-learn.zip . \
  -x "*.git*" \
  -x "*.md" \
  -x "*.zip" \
  -x "*.DS_Store" \
  -x ".github/*"