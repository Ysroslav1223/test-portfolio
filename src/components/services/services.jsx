import { useEffect, useState,} from "react"
import { X, ChevronDown, Loader2, Calculator, FileText, Send, Check } from 'lucide-react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { gsap } from "gsap";

// Схемы валидации для разных форм
const estimateSchema = yup.object({
  name: yup.string().required('Имя обязательно').min(2, 'Минимум 2 символа'),
  contact: yup.string().required('Контакт обязателен').min(5, 'Минимум 5 символов'),
  projectType: yup.string().required('Выберите тип проекта'),
  budget: yup.number()
    .typeError('Бюджет должен быть числом')
    .positive('Бюджет должен быть положительным')
    .required('Бюджет обязателен'),
  deadline: yup.string().required('Выберите сроки'),
  projectDetails: yup.string()
    .required('Детали проекта обязательны')
    .min(10, 'Минимум 10 символов')
})

const briefSchema = yup.object({
  name: yup.string().required('Имя обязательно').min(2, 'Минимум 2 символа'),
  contact: yup.string().required('Контакт обязателен').min(5, 'Минимум 5 символов'),
  briefType: yup.string().required('Выберите тип брифа'),
  projectDetails: yup.string()
    .required('Описание проекта обязательно')
    .min(20, 'Минимум 20 символов')
})

const contactSchema = yup.object({
  name: yup.string().required('Имя обязательно').min(2, 'Минимум 2 символа'),
  contact: yup.string().required('Контакт обязателен').min(5, 'Минимум 5 символов'),
  message: yup.string()
    .required('Сообщение обязательно')
    .min(10, 'Минимум 10 символов')
})

export const Services = ({title, descrip, btn}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formType, setFormType] = useState('смета')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const getSchema = () => {
    switch(formType) {
      case 'смета': return estimateSchema
      case 'бриф': return briefSchema
      case 'связь': return contactSchema
      default: return yup.object()
    }
  }

  useEffect(() => {
  let savedScrollY = 0;
  
  if (isModalOpen) {
    savedScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    if (window.lenis && window.lenis.stop) {
      window.lenis.stop();
      window._pausedLenis = window.lenis;
    }
    if (gsap && gsap.globalTimeline) {
      gsap.globalTimeline.pause();
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      window.scrollTo(0, savedScrollY);
      
      if (gsap && gsap.globalTimeline) {
        gsap.globalTimeline.resume();
      }
      if (window._pausedLenis && window._pausedLenis.start) {
        window._pausedLenis.start();
        delete window._pausedLenis;
      }
    };
  }
}, [isModalOpen]);
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(getSchema()),
    mode: 'onChange'
  })



  const handleButtonClick = (buttonName) => {
    setFormType(buttonName)
    setIsModalOpen(true)
    setSubmitSuccess(false)
    reset({
      name: '',
      contact: '',
      projectType: '',
      budget: '',
      deadline: '',
      projectDetails: '',
      briefType: '',
      message: ''
    })
  }
  const prepareEstimateData = (data) => ({
    client: {
      name: data.name,
      contact: data.contact
    },
    project: {
      type: data.projectType,
      budget: data.budget,
      deadline: data.deadline,
      details: data.projectDetails
    }
  })

  const prepareBriefData = (data) => ({
    client: {
      name: data.name,
      contact: data.contact
    },
    brief: {
      type: data.briefType,
      description: data.projectDetails
    }
  })

  const prepareContactData = (data) => ({
    client: {
      name: data.name,
      contact: data.contact
    },
    message: data.message
  })
  const areAllFieldsFilled = (obj) => {
    const checkObject = (obj) => {
      for (let key in obj) {
        if (typeof obj[key] === 'object') {
          if (!checkObject(obj[key])) return false
        } else if (!obj[key] && obj[key] !== 0) {
          return false
        }
      }
      return true
    }
    return checkObject(obj)
  }

  const sendToTelegram = async (data, formType) => {
    let dataToSend

    switch(formType) {
      case 'смета':
        dataToSend = prepareEstimateData(data)
        break
      case 'бриф':
        dataToSend = prepareBriefData(data)
        break
      case 'связь':
        dataToSend = prepareContactData(data)
        break
      default:
        return false
    }
    if (!areAllFieldsFilled(dataToSend)) {
      alert('Не все обязательные поля заполнены')
      return false
    }
    const formatMessage = (data, type) => {
      let message = `🎬 *Новая заявка:* ${type === 'смета' ? 'СМЕТА' : type === 'бриф' ? 'БРИФ' : 'КОНТАКТ'}\n\n`
      
      message += `👤 *Клиент:*\n`
      message += `• Имя: ${data.client.name}\n`
      message += `• Контакт: ${data.client.contact}\n\n`
      
      if (type === 'смета') {
        message += `📊 *Детали проекта:*\n`
        message += `• Тип проекта: ${data.project.type}\n`
        message += `• Бюджет: ${data.project.budget} руб.\n`
        message += `• Сроки: ${data.project.deadline}\n`
        message += `• Детали:\n${data.project.details}\n`
      } else if (type === 'бриф') {
        message += `📝 *Детали брифа:*\n`
        message += `• Тип брифа: ${data.brief.type}\n`
        message += `• Описание:\n${data.brief.description}\n`
      } else if (type === 'связь') {
        message += `💬 *Сообщение:*\n${data.message}\n`
      }
      
      message += `\n⏰ *Отправлено:* ${new Date().toLocaleString('ru-RU')}`
      
      return message
    }

    const telegramMessage = formatMessage(dataToSend, formType)
    
    try {
      const BOT_TOKEN = 'YOUR_BOT_TOKEN'
      const CHAT_ID = 'YOUR_CHAT_ID'
      
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      })

      if (!response.ok) {
        throw new Error('Ошибка отправки в Telegram')
      }

      return true
    } catch (error) {
      console.error('Ошибка отправки:', error)
      return false
    }
  }
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    
    try {
      const success = await sendToTelegram(data, formType)

      console.log(
        data
      );
      
      if (success) {
        setSubmitSuccess(true)
        setTimeout(() => {
          setIsModalOpen(false)
          reset()
          setSubmitSuccess(false)
        }, 2000)
      } else {
        alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.')
      }
    } catch (error) {
      console.error('Ошибка:', error)
      alert('Произошла ошибка. Пожалуйста, попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }
  const ErrorMessage = ({ message }) => (
    <p className="mt-1 text-sm min-h-[10px] text-red-600">{message}</p>
  )

  return (
  <div className="border-b border-black border-t py-1 px-2 w-full max-w-xl mx-auto bg-white relative">
    <div className="mb-2">
      <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="mb-3">
      <p className="text-gray-600">{descrip}</p>
    </div>
    <div className="flex flex-wrap gap-3">
      {btn.map((buttonName) => (
        <button
          key={buttonName}
          className="px-4 py-2 text-sm sm:px-5 sm:py-3 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-all hover:border-gray-400 active:scale-95"
          onClick={() => handleButtonClick(buttonName)}
        >
          {buttonName}
        </button>
      ))}
    </div>
    
    {isModalOpen && (
      <>
        <div 
          className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => !isSubmitting && setIsModalOpen(false)}
        />
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="bg-white w-full h-full sm:h-auto sm:rounded-3xl sm:max-w-xl sm:shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b p-4 sm:p-6 flex-shrink-0">
              <div className="flex justify-between items-center">
                <div className="pr-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {formType === 'смета' && 'Запрос сметы'}
                    {formType === 'бриф' && 'Заполнение брифа'}
                    {formType === 'связь' && 'Связаться с нами'}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1">
                    {formType === 'смета' && 'Получите расчет стоимости проекта'}
                    {formType === 'бриф' && 'Опишите детали проекта'}
                    {formType === 'связь' && 'Задайте вопрос или обсудите сотрудничество'}
                  </p>
                </div>
                
                <button
                  onClick={() => !isSubmitting && setIsModalOpen(false)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  disabled={isSubmitting}
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>
            
            {/* Уведомление об успешной отправке */}
            {submitSuccess && (
              <div className="px-4 sm:px-6 py-3 bg-green-50 border-y border-green-200 flex-shrink-0">
                <p className="text-green-700 font-medium text-sm">Заявка успешно отправлена!</p>
                <p className="text-green-600 text-xs">Мы свяжемся с вами в ближайшее время</p>
              </div>
            )}
            
            {/* Форма с прокруткой только на мобильных */}
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  {/* Базовые поля - имя и контакт */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Ваше имя <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('name')}
                        className={`w-full py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 transition-colors ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Иван Иванов"
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Контакт для связи <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        {...register('contact')}
                        className={`w-full py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 transition-colors ${errors.contact ? 'border-red-500' : ''}`}
                        placeholder="Телефон, email или Telegram"
                        disabled={isSubmitting}
                      />
                      {errors.contact && (
                        <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Специфичные поля для каждого типа формы */}
                  {formType === 'смета' && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-gray-700">
                            Тип проекта <span className="text-red-500">*</span>
                          </label>
                          <select
                            {...register('projectType')}
                            className={`w-full py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 appearance-none transition-colors ${errors.projectType ? 'border-red-500' : ''}`}
                            disabled={isSubmitting}
                          >
                            <option value="">Выберите тип проекта</option>
                            <option value="music_video">Музыкальный клип</option>
                            <option value="advertising">Рекламный ролик</option>
                            <option value="corporate">Корпоративное видео</option>
                            <option value="event">Съемка мероприятия</option>
                            <option value="animation">Анимация/Моушн</option>
                            <option value="other">Другое</option>
                          </select>
                          {errors.projectType && (
                            <p className="text-red-500 text-xs mt-1">{errors.projectType.message}</p>
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-gray-700">
                            Примерный бюджет (руб.) <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            {...register('budget')}
                            className={`w-full py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 transition-colors ${errors.budget ? 'border-red-500' : ''}`}
                            placeholder="Например: 50000"
                            min="0"
                            disabled={isSubmitting}
                          />
                          {errors.budget && (
                            <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Желаемые сроки <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register('deadline')}
                          className={`w-full py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 appearance-none transition-colors ${errors.deadline ? 'border-red-500' : ''}`}
                          disabled={isSubmitting}
                        >
                          <option value="">Выберите сроки реализации</option>
                          <option value="urgent">Срочно (1-2 недели)</option>
                          <option value="1_month">В течение месяца</option>
                          <option value="1_3_months">1-3 месяца</option>
                          <option value="3_6_months">3-6 месяцев</option>
                          <option value="flexible">Гибкие сроки</option>
                        </select>
                        {errors.deadline && (
                          <p className="text-red-500 text-xs mt-1">{errors.deadline.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Детали проекта <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          {...register('projectDetails')}
                          className={`w-full py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 resize-none transition-colors ${errors.projectDetails ? 'border-red-500' : ''}`}
                          rows={2}
                          placeholder="Опишите подробно проект..."
                          disabled={isSubmitting}
                        />
                        {errors.projectDetails && (
                          <p className="text-red-500 text-xs mt-1">{errors.projectDetails.message}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {formType === 'бриф' && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Тип брифа <span className="text-red-500">*</span>
                        </label>
                        <select
                          {...register('briefType')}
                          className={`w-full py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 appearance-none transition-colors ${errors.briefType ? 'border-red-500' : ''}`}
                          disabled={isSubmitting}
                        >
                          <option value="">Выберите тип брифа</option>
                          <option value="video_brief">Бриф на видеопродакшн</option>
                          <option value="creative_brief">Креативный бриф</option>
                          <option value="technical_brief">Технический бриф</option>
                          <option value="full_brief">Полный бриф (все этапы)</option>
                        </select>
                        {errors.briefType && (
                          <p className="text-red-500 text-xs mt-1">{errors.briefType.message}</p>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Детали проекта <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          {...register('projectDetails')}
                          className={`w-full py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 resize-none transition-colors ${errors.projectDetails ? 'border-red-500' : ''}`}
                          rows={2}
                          placeholder="Опишите детали проекта..."
                          disabled={isSubmitting}
                        />
                        {errors.projectDetails && (
                          <p className="text-red-500 text-xs mt-1">{errors.projectDetails.message}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {formType === 'связь' && (
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Ваше сообщение <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register('message')}
                        className={`w-full py-2 text-sm sm:text-base border-0 border-b border-gray-300 focus:border-black focus:outline-none focus:ring-0 resize-none transition-colors ${errors.message ? 'border-red-500' : ''}`}
                        rows={2}
                        placeholder="Напишите, по какому вопросу хотите связаться..."
                        disabled={isSubmitting}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Кнопки отправки - прикреплены к низу на мобильных */}
                <div className="pt-6 mt-6 border-t border-gray-100 space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-black text-white py-3 text-sm sm:text-base rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Отправка...' : 
                       formType === 'смета' ? 'Получить расчет сметы' :
                       formType === 'бриф' ? 'Отправить бриф' :
                       'Отправить сообщение'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => !isSubmitting && setIsModalOpen(false)}
                      disabled={isSubmitting}
                      className="px-4 sm:px-6 py-3 text-sm sm:text-base border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                    >
                      Отмена
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center">
                    {formType === 'смета' && 'Расчет сметы будет готов в течение 24 часов'}
                    {formType === 'бриф' && 'Мы свяжемся для обсуждения деталей в течение 2 часов'}
                    {formType === 'связь' && 'Ответим в течение 2 часов в рабочее время'}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
)
}