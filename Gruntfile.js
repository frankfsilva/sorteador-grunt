module.exports = function(grunt) {                                      //configuração a execução do grunt
    grunt.initConfig({                                      
        pkg: grunt.file.readJSON('package.json'),                       //aponta para o arquivo onde está o script
        less: {                                                         //configurando a execução do plugin less
            development: {                                              //diz respeito ao ambiente de desenvolvimento (vscode)
                files: {
                    'dev/styles/main.css': './src/styles/main.less'     //arquivo de origem e destino
                }
            },
            production: {                                               //ambiente de produção (vercel e outros)
                options: {
                    compress: true,                                     //assim é criado o arquivo de produção 'minificado'
                },
                files: {
                    'dist/styles/main.min.css': './src/styles/main.less' //arquivo de destino após a compressão e arquivo de origem
                }
            } 
        },
        watch: {                                                        //configurando a execução do plugin "contrib-watch"
            less: {
                files: ['./src/styles/**/*.less'],                      //arquivos e pastas observados / ** -> qualquer pasta / * qualquer arquivo-> 
                tasks: ['less:development']                             //tarefas executadas quando observadas alterações nos arquivos decritos acima
            },
            html: {
                files: ['./src/index.html'],                            //arquivos e pastas observados
                tasks: ['replace:dev']                                  //arquivos e pastas observados
            }
        },
        replace: {                                                      //configurando a execução do plugin replace
            dev: {                                                      //ambiente de desenvolvimnto (é o utilizado pelo usuário)
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',                   //termo que deve ser encontrado e substituido
                            replacement: './styles/main.css'            //onde está o arquivo novo
                        },
                        {
                            match: 'ENDERECO_DO_JS',                    //termo que deve ser encontrado e substituido
                            replacement: '../src/scripts/main.js'       //onde está o arquivo novo
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src:['src/index.html'],                         //arquivo origem. Onde consta o termo a ser substituido
                        dest: 'dev/'                                    //pasta de destino
                    }   
                ]
            },
            dist: {                                                     //ambiente de distribuição
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',                   //termo que deve ser encontrado e substituido
                            replacement: './styles/main.min.css'        //onde estará o arquivo novo
                        },
                        {
                            match: 'ENDERECO_DO_JS',                    //termo que deve ser encontrado e substituido
                            replacement: './scripts/main.min.js'       //onde está o arquivo novo
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src:['./prebuild/index.html'],                  //arquivo origem. Onde consta o termo a ser substituido
                        dest: 'dist/'                                   //pasta de destino
                    }   
                ]
            }
        },
        htmlmin: {                                                      //configurando a execução do plugin de minificação do html
            dist: {
                options: {
                    removeComments: true,                               //remove qualquer comentário existente no html             
                    collapsewhitespace: true                            //remove todos os espaços em branco          
                },
                files: {
                    'prebuild/index.html': './src/index.html'           //"prebuild" => temporária de destino para armazenar o html minimizado antes de enviar para a pasta "dist" e pasta de origem
                }
            }
        },
        clean: ['prebuild'],                                            //configurando a execução do plugin de limpesa da pasta temporária
        uglify: {                                                       //configurando a execução do plugin de minificação do js
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'   //"dist" => destino para armazenar o js minificado e a pasta de origem
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less');                           //carregando o plugin para integração do less com o grunt
    grunt.loadNpmTasks('grunt-contrib-watch');                          //carregando o plugin para observar em tempo real as alterações no código fonte
    grunt.loadNpmTasks('grunt-replace')                                 //carregando o plugin que cria um novo html no ambiente de desenvolvimento que busca pelo style.css (estilo correto durante a execução)
    grunt.loadNpmTasks('grunt-contrib-htmlmin')                         //carregando o plugin que minifica o código html
    grunt.loadNpmTasks('grunt-contrib-clean')                           //carregando o plugin que apaga a pasta temporária após a atualização da pasta dist
    grunt.loadNpmTasks('grunt-contrib-uglify')                          //carregando o plugin que comprime o código js

    grunt.registerTask('default', ['watch']);                           //função default do grunt que dispensa chamar o nome de cada tarefa, pois ele executa todas.
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);       //função para compilar as tarefas
}