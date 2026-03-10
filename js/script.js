document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const modal = document.getElementById('feedback-modal');
  const closeBtn = document.querySelector('.close');
  const okBtn = document.getElementById('modal-ok');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nome = form.querySelector('input[type="text"]');
      const email = form.querySelector('input[type="email"]');
      const comentario = form.querySelector('textarea');
      
      if (nome.value && email.value && comentario.value) {
        modal.style.display = 'block';
        
        form.reset();
      } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }
  
  if (okBtn) {
    okBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }
  
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});


// Animação de contagem dos números
document.addEventListener('DOMContentLoaded', function() {
  // Contador animado
  function animateNumber(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      element.textContent = current + '+';
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Observador de interseção para animar números quando visíveis
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numeros = document.querySelectorAll('.numero-valor');
        numeros.forEach(numero => {
          const valor = parseInt(numero.getAttribute('data-valor'));
          if (!numero.classList.contains('animado')) {
            animateNumber(numero, 0, valor, 2000);
            numero.classList.add('animado');
          }
        });
      }
    });
  }, { threshold: 0.5 });

  const numerosSection = document.querySelector('.numeros-section');
  if (numerosSection) {
    observer.observe(numerosSection);
  }

  // Animação suave ao scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Efeito de parallax suave na imagem
  window.addEventListener('scroll', () => {
    const image = document.querySelector('.totoro-image');
    if (image) {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.1;
      image.style.transform = `translateY(${rate}px)`;
    }
  });

  // Animação de entrada dos cards
  const cards = document.querySelectorAll('.mvv-card, .timeline-item, .numero-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });
});



document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const modal = document.getElementById('feedback-modal');
  const closeBtn = document.querySelector('.close');
  const okBtn = document.getElementById('modal-ok');
  
  // Elementos do formulário
  const nomeInput = document.querySelector('input[type="text"]');
  const emailInput = document.querySelector('input[type="email"]');
  const comentarioInput = document.querySelector('textarea');
  
  // Função para validar email
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  // Função para validar campo
  function validarCampo(campo, tipo = 'texto') {
    const valor = campo.value.trim();
    const erroElement = campo.parentElement.querySelector('.mensagem-erro');
    
    if (!erroElement) return true;
    
    if (valor === '') {
      campo.classList.add('erro');
      campo.classList.remove('sucesso');
      erroElement.classList.add('visible');
      return false;
    }
    
    if (tipo === 'email' && !validarEmail(valor)) {
      campo.classList.add('erro');
      campo.classList.remove('sucesso');
      erroElement.textContent = 'Por favor, insira um email válido';
      erroElement.classList.add('visible');
      return false;
    }
    
    campo.classList.remove('erro');
    campo.classList.add('sucesso');
    erroElement.classList.remove('visible');
    return true;
  }
  
  // Adicionar mensagens de erro
  function adicionarMensagemErro(campo, mensagem) {
    const formGroup = campo.parentElement;
    let erroElement = formGroup.querySelector('.mensagem-erro');
    
    if (!erroElement) {
      erroElement = document.createElement('div');
      erroElement.className = 'mensagem-erro';
      erroElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + mensagem;
      formGroup.appendChild(erroElement);
    }
  }
  
  // Adicionar mensagens de erro aos campos
  if (nomeInput) {
    adicionarMensagemErro(nomeInput, 'Por favor, preencha seu nome');
  }
  
  if (emailInput) {
    adicionarMensagemErro(emailInput, 'Por favor, preencha seu email');
  }
  
  if (comentarioInput) {
    adicionarMensagemErro(comentarioInput, 'Por favor, escreva seu comentário');
  }
  
  // Event listeners para validação em tempo real
  if (nomeInput) {
    nomeInput.addEventListener('input', function() {
      validarCampo(this, 'texto');
    });
    
    nomeInput.addEventListener('blur', function() {
      validarCampo(this, 'texto');
    });
  }
  
  if (emailInput) {
    emailInput.addEventListener('input', function() {
      validarCampo(this, 'email');
    });
    
    emailInput.addEventListener('blur', function() {
      validarCampo(this, 'email');
    });
  }
  
  if (comentarioInput) {
    comentarioInput.addEventListener('input', function() {
      validarCampo(this, 'texto');
    });
    
    comentarioInput.addEventListener('blur', function() {
      validarCampo(this, 'texto');
    });
  }
  
  // Submit do formulário
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validar todos os campos
      const nomeValido = nomeInput ? validarCampo(nomeInput, 'texto') : true;
      const emailValido = emailInput ? validarCampo(emailInput, 'email') : true;
      const comentarioValido = comentarioInput ? validarCampo(comentarioInput, 'texto') : true;
      
      if (nomeValido && emailValido && comentarioValido) {
        // Adicionar efeito de loading no botão
        const submitBtn = form.querySelector('.form-botao');
        const btnText = submitBtn.innerHTML;
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Enviando...';
        
        // Simular envio (aqui você pode adicionar uma requisição AJAX real)
        setTimeout(() => {
          // Mostrar modal
          modal.style.display = 'block';
          
          // Resetar formulário
          form.reset();
          
          // Remover classes de sucesso
          document.querySelectorAll('.sucesso').forEach(el => {
            el.classList.remove('sucesso');
          });
          
          // Restaurar botão
          submitBtn.classList.remove('loading');
          submitBtn.innerHTML = btnText;
          
          // Scroll suave para o modal
          modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
      } else {
        // Mostrar mensagem de erro geral
        const primeiroErro = document.querySelector('.erro');
        if (primeiroErro) {
          primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
          primeiroErro.focus();
        }
        
        // Efeito de shake nos campos com erro
        document.querySelectorAll('.erro').forEach(el => {
          el.style.animation = 'none';
          el.offsetHeight;
          el.style.animation = 'shake 0.5s ease';
        });
      }
    });
  }
  
  // Fechar modal
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      fecharModal();
    });
  }
  
  if (okBtn) {
    okBtn.addEventListener('click', function() {
      fecharModal();
    });
  }
  
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      fecharModal();
    }
  });
  
  // Fechar modal com tecla ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      fecharModal();
    }
  });
  
  function fecharModal() {
    modal.style.display = 'none';
  }
  
  // Animação de entrada dos elementos
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observar elementos para animação
  document.querySelectorAll('.info-item, .form-grupo, .social-link, .totoro-contact-image').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Efeito de foco nos campos do formulário
  const campos = document.querySelectorAll('.form-input, .form-textarea');
  campos.forEach(campo => {
    campo.addEventListener('focus', function() {
      this.parentElement.classList.add('focado');
    });
    
    campo.addEventListener('blur', function() {
      this.parentElement.classList.remove('focado');
    });
  });
  
  // Animação shake
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);
});

// Função para máscara de telefone (opcional)
function mascaraTelefone(telefone) {
  const valor = telefone.value.replace(/\D/g, '');
  if (valor.length <= 10) {
    telefone.value = valor.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  } else {
    telefone.value = valor.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}

// Se quiser adicionar campo de telefone, descomente esta parte
/*
document.addEventListener('DOMContentLoaded', function() {
  const telefoneInput = document.querySelector('input[type="tel"]');
  if (telefoneInput) {
    telefoneInput.addEventListener('input', function() {
      mascaraTelefone(this);
    });
  }
});
*/