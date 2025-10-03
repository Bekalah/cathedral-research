import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { GenerateSW } from 'workbox-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

export default {
  mode: isProduction ? 'production' : 'development',
  
  entry: {
    main: './BUILDING CATHEDRALS/src/index.js',
    cathedral: './BUILDING CATHEDRALS/apps/cathedral-of-circuits/src/index.js',
    liber: './BUILDING CATHEDRALS/apps/liber-arcanae/src/index.js',
    grimoire: './BUILDING CATHEDRALS/apps/stone-grimoire/src/index.js',
    mystery: './BUILDING CATHEDRALS/apps/magical-mystery-house/src/index.js',
    game: './BUILDING CATHEDRALS/games/liber-arcanae/src/index.js',
    'three-engine': './BUILDING CATHEDRALS/packages/three-engine/src/index.js',
    'tesseract-bridge': './BUILDING CATHEDRALS/packages/tesseract-bridge/src/index.js',
    'codex-14499': './BUILDING CATHEDRALS/packages/codex-14499/src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    chunkFilename: isProduction ? '[name].[contenthash].chunk.js' : '[name].chunk.js',
    assetModuleFilename: 'assets/[name].[hash][ext]',
    clean: true,
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'BUILDING CATHEDRALS/src'),
      '@packages': path.resolve(__dirname, 'BUILDING CATHEDRALS/packages'),
      '@apps': path.resolve(__dirname, 'BUILDING CATHEDRALS/apps'),
      '@games': path.resolve(__dirname, 'BUILDING CATHEDRALS/games'),
      '@tools': path.resolve(__dirname, 'BUILDING CATHEDRALS/tools'),
      '@assets': path.resolve(__dirname, 'BUILDING CATHEDRALS/assets'),
      '@components': path.resolve(__dirname, 'BUILDING CATHEDRALS/src/components'),
      '@utils': path.resolve(__dirname, 'BUILDING CATHEDRALS/src/utils'),
      '@three': 'three',
      'three/examples': 'three/examples/jsm'
    },
    fallback: {
      "path": require.resolve("path-browserify"),
      "fs": false,
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer")
    }
  },

  module: {
    rules: [
      // JavaScript/TypeScript
      {
        test: /\.(js|ts|tsx|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 3 }],
              '@babel/preset-typescript',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },

      // CSS & SCSS
      {
        test: /\.(css|scss|sass)$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: isProduction ? '[hash:base64]' : '[name]__[local]'
              }
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },

      // GLSL Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        type: 'asset/source',
        use: [
          'glslify-loader'
        ]
      },

      // Images
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp|avif)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb
          }
        },
        generator: {
          filename: 'images/[name].[hash][ext]'
        }
      },

      // Fonts
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash][ext]'
        }
      },

      // Audio
      {
        test: /\.(mp3|wav|ogg|m4a|aac|flac)$/,
        type: 'asset/resource',
        generator: {
          filename: 'audio/[name].[hash][ext]'
        }
      },

      // Video
      {
        test: /\.(mp4|webm|ogv|mov|avi)$/,
        type: 'asset/resource',
        generator: {
          filename: 'video/[name].[hash][ext]'
        }
      },

      // 3D Models
      {
        test: /\.(gltf|glb|fbx|obj|dae|3ds|ply|stl)$/,
        type: 'asset/resource',
        generator: {
          filename: 'models/[name].[hash][ext]'
        }
      },

      // HDR Images
      {
        test: /\.(hdr|exr)$/,
        type: 'asset/resource',
        generator: {
          filename: 'hdri/[name].[hash][ext]'
        }
      },

      // WebAssembly
      {
        test: /\.wasm$/,
        type: 'asset/resource',
        generator: {
          filename: 'wasm/[name].[hash][ext]'
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),

    // HTML Pages
    new HtmlWebpackPlugin({
      template: './BUILDING CATHEDRALS/public/index.html',
      filename: 'index.html',
      chunks: ['main'],
      inject: 'body',
      minify: isProduction
    }),

    new HtmlWebpackPlugin({
      template: './BUILDING CATHEDRALS/apps/cathedral-of-circuits/public/index.html',
      filename: 'cathedral/index.html',
      chunks: ['cathedral'],
      inject: 'body',
      minify: isProduction
    }),

    new HtmlWebpackPlugin({
      template: './BUILDING CATHEDRALS/apps/liber-arcanae/public/index.html',
      filename: 'liber/index.html',
      chunks: ['liber'],
      inject: 'body',
      minify: isProduction
    }),

    new HtmlWebpackPlugin({
      template: './BUILDING CATHEDRALS/apps/stone-grimoire/public/index.html',
      filename: 'grimoire/index.html',
      chunks: ['grimoire'],
      inject: 'body',
      minify: isProduction
    }),

    new HtmlWebpackPlugin({
      template: './BUILDING CATHEDRALS/apps/magical-mystery-house/public/index.html',
      filename: 'mystery/index.html',
      chunks: ['mystery'],
      inject: 'body',
      minify: isProduction
    }),

    new HtmlWebpackPlugin({
      template: './BUILDING CATHEDRALS/games/liber-arcanae/public/index.html',
      filename: 'game/index.html',
      chunks: ['game'],
      inject: 'body',
      minify: isProduction
    }),

    // Extract CSS
    ...(isProduction ? [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].chunk.css'
      })
    ] : []),

    // Copy static assets
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'BUILDING CATHEDRALS/assets',
          to: 'assets',
          noErrorOnMissing: true
        },
        {
          from: 'BUILDING CATHEDRALS/tools',
          to: 'tools',
          noErrorOnMissing: true
        },
        {
          from: 'BUILDING CATHEDRALS/public/manifest.json',
          to: 'manifest.json',
          noErrorOnMissing: true
        },
        {
          from: 'BUILDING CATHEDRALS/public/robots.txt',
          to: 'robots.txt',
          noErrorOnMissing: true
        }
      ]
    }),

    // Service Worker for PWA
    ...(isProduction ? [
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|avif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources'
            }
          },
          {
            urlPattern: /\.(?:gltf|glb|hdr|exr)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: '3d-assets',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
              }
            }
          }
        ]
      })
    ] : []),

    // Bundle analyzer (only when ANALYZE=true)
    ...(process.env.ANALYZE === 'true' ? [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'bundle-analysis.html'
      })
    ] : [])
  ],

  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: isProduction
          }
        }
      }),
      new CssMinimizerPlugin()
    ],

    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Three.js and related libraries
        three: {
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          name: 'three',
          chunks: 'all',
          priority: 20
        },
        
        // React and related libraries
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 15
        },

        // Vendor libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: 10
        },

        // Common code between apps
        common: {
          minChunks: 2,
          chunks: 'all',
          name: 'common',
          priority: 5,
          enforce: true
        }
      }
    },

    runtimeChunk: {
      name: 'runtime'
    }
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'BUILDING CATHEDRALS/public')
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/cathedral/, to: '/cathedral/index.html' },
        { from: /^\/liber/, to: '/liber/index.html' },
        { from: /^\/grimoire/, to: '/grimoire/index.html' },
        { from: /^\/mystery/, to: '/mystery/index.html' },
        { from: /^\/game/, to: '/game/index.html' }
      ]
    },
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },

  performance: {
    hints: isProduction ? 'warning' : false,
    maxEntrypointSize: 2048000, // 2MB
    maxAssetSize: 1024000 // 1MB
  },

  devtool: isDevelopment ? 'eval-source-map' : 'source-map',

  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
};