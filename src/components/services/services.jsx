import { useState,} from "react"
import { X } from 'lucide-react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

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

  // Определяем схему в зависимости от типа формы
  const getSchema = () => {
    switch(formType) {
      case 'смета': return estimateSchema
      case 'бриф': return briefSchema
      case 'связь': return contactSchema
      default: return yup.object()
    }
  }

  // Настройка react-hook-form
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

  // Проверка, что объекты не пустые
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
            className="px-5 py-3 bg-white text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-all hover:border-gray-400 active:scale-95"
            onClick={() => handleButtonClick(buttonName)}
          >
            {buttonName === 'смета' && '📊 '}
            {buttonName === 'бриф' && '📝 '}
            {buttonName === 'связь' && '📞 '}
            {buttonName}
          </button>
        ))}
      </div>
      {isModalOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setIsModalOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[100vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {formType === 'смета' && '📊 Запрос сметы'}
                    {formType === 'бриф' && '📝 Заполнение брифа'}
                    {formType === 'связь' && '📞 Связаться с нами'}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {formType === 'смета' && 'Получите детальный расчет стоимости проекта'}
                    {formType === 'бриф' && 'Опишите детали проекта для понимания задачи'}
                    {formType === 'связь' && 'Задайте вопрос или обсудите сотрудничество'}
                  </p>
                </div>
                
                <button
                  onClick={() => !isSubmitting && setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  disabled={isSubmitting}
                >
                  <X size={24} />
                </button>
              </div>
              {submitSuccess && (
                <div className="p-4 bg-green-50 border-b border-green-200 text-green-700">
                  ✅ Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      {...register('name')}
                      className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
                      placeholder="Иван Иванов"
                      disabled={isSubmitting}
                    />
                    {errors.name && <ErrorMessage message={errors.name.message} />}
                  </div>
                  
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Контакт для связи *
                    </label>
                    <input
                      type="text"
                      {...register('contact')}
                      className={`w-full p-3 border ${errors.contact ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
                      placeholder="Телефон, email или Telegram"
                      disabled={isSubmitting}
                    />
                    {errors.contact && <ErrorMessage message={errors.contact.message} />}
                  </div>
                </div>
                {formType === 'смета' && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2 font-medium text-gray-700">
                          Тип проекта *
                        </label>
                        <select
                          {...register('projectType')}
                          className={`w-full p-3 border ${errors.projectType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
                          disabled={isSubmitting}
                        >
                          <option value="">Выберите тип</option>
                          <option value="music_video">Музыкальный клип</option>
                          <option value="advertising">Рекламный ролик</option>
                          <option value="corporate">Корпоративное видео</option>
                          <option value="event">Съемка мероприятия</option>
                          <option value="animation">Анимация/Моушн</option>
                          <option value="other">Другое</option>
                        </select>
                        {errors.projectType && <ErrorMessage message={errors.projectType.message} />}
                      </div>
                      
                      <div>
                        <label className="block mb-2 font-medium text-gray-700">
                          Примерный бюджет (руб.) *
                        </label>
                        <input
                          type="number"
                          {...register('budget')}
                          className={`w-full p-3 border ${errors.budget ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
                          placeholder="Например: 50000"
                          min="0"
                          disabled={isSubmitting}
                        />
                        {errors.budget && <ErrorMessage message={errors.budget.message} />}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">
                        Желаемые сроки *
                      </label>
                      <select
                        {...register('deadline')}
                        className={`w-full p-3 border ${errors.deadline ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
                        disabled={isSubmitting}
                      >
                        <option value="">Выберите срок</option>
                        <option value="urgent">Срочно (1-2 недели)</option>
                        <option value="1_month">В течение месяца</option>
                        <option value="1_3_months">1-3 месяца</option>
                        <option value="3_6_months">3-6 месяцев</option>
                        <option value="flexible">Гибкие сроки</option>
                      </select>
                      {errors.deadline && <ErrorMessage message={errors.deadline.message} />}
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">
                        Детали проекта *
                      </label>
                      <textarea
                        {...register('projectDetails')}
                        className={`w-full p-3 border ${errors.projectDetails ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
                        rows="5"
                        placeholder="Опишите подробно проект..."
                        disabled={isSubmitting}
                      />
                      {errors.projectDetails && <ErrorMessage message={errors.projectDetails.message} />}
                    </div>
                  </>
                )}
                {formType === 'бриф' && (
                  <>
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">
                        Тип брифа *
                      </label>
                      <select
                        {...register('briefType')}
                        className={`w-full p-3 border ${errors.briefType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
                        disabled={isSubmitting}
                      >
                        <option value="">Выберите тип</option>
                        <option value="video_brief">Бриф на видеопродакшн</option>
                        <option value="creative_brief">Креативный бриф</option>
                        <option value="technical_brief">Технический бриф</option>
                        <option value="full_brief">Полный бриф (все этапы)</option>
                      </select>
                      {errors.briefType && <ErrorMessage message={errors.briefType.message} />}
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">
                        Детали проекта *
                      </label>
                      <textarea
                        {...register('projectDetails')}
                        className={`w-full p-3 border ${errors.projectDetails ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
                        rows="6"
                        placeholder="Опишите детали проекта..."
                        disabled={isSubmitting}
                      />
                      {errors.projectDetails && <ErrorMessage message={errors.projectDetails.message} />}
                    </div>
                  </>
                )}
                {formType === 'связь' && (
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Ваше сообщение *
                    </label>
                    <textarea
                      {...register('message')}
                      className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-black focus:border-black`}
                      rows="4"
                      placeholder="Напишите, по какому вопросу хотите связаться..."
                      disabled={isSubmitting}
                    />
                    {errors.message && <ErrorMessage message={errors.message.message} />}
                  </div>
                )}
                <div className="sticky bottom-0 bg-white pt-6 border-t">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Отправка...' : 
                       formType === 'смета' ? '📋 Получить расчет сметы' :
                       formType === 'бриф' ? '📄 Отправить бриф' :
                       '📨 Отправить сообщение'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => !isSubmitting && setIsModalOpen(false)}
                      disabled={isSubmitting}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      Отмена
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    {formType === 'смета' && 'Расчет сметы будет готов в течение 24 часов'}
                    {formType === 'бриф' && 'Мы свяжемся для обсуждения деталей'}
                    {formType === 'связь' && 'Ответим в течение 2 часов в рабочее время'}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  )
}