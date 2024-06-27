import { useTranslation } from 'next-i18next';
import { useToast } from '@fastgpt/web/hooks/useToast';
import { useCallback } from 'react';

/**
 * copy text data
 */
export const useCopyData = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const copyData = useCallback(
    async (data: string, title: string | null = t('common.Copy Successful'), duration = 1000) => {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(data);
          //这里是新加的，用来bi界面取值用
          var oldInput = document.querySelector('input.textConent');  
          if (oldInput) {  
              oldInput.remove();  
          }  
          // 创建一个新的 input 元素  
          var newInput = document.createElement('input');  
          newInput.type = 'text'; // 默认为 'text'，但明确指定总是好的  
          newInput.className = 'textConent'; // 设置类名  
          newInput.value = data; // 设置值  
          document.body.appendChild(newInput);
        } else {
          throw new Error('');
        }
      } catch (error) {
        console.log(error);

        const textarea = document.createElement('textarea');
        textarea.value = data;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body?.removeChild(textarea);
        //新加的两种复制方式
         //这里是新加的，用来bi界面取值用
         var oldInput = document.querySelector('input.textConent');  
         if (oldInput) {  
             oldInput.remove();  
         }  
         // 创建一个新的 input 元素  
         var newInput = document.createElement('input');  
         newInput.type = 'text'; // 默认为 'text'，但明确指定总是好的  
         newInput.className = 'textConent'; // 设置类名  
         newInput.value = data; // 设置值  
         document.body.appendChild(newInput);
      }

      if (title) {
        toast({
          title,
          status: 'success',
          duration
        });
      }
    },
    [t, toast]
  );

  return {
    copyData
  };
};
